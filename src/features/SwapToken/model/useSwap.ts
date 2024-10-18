import NiceModal from '@ebay/nice-modal-react';
import { MaxUint256 } from '@ethersproject/constants';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { useUnit } from 'effector-react/compat';
import { BigNumber, ethers, utils } from 'ethers';

import TOKEN from '@/app/abi/token.json';
import { web3Modal } from '@/app/providers';
import { track, AnalyticsEvent } from '@/shared/analytics';
import { $symbiosis } from '@/shared/lib';
import { UnknownSwapModal } from '@/shared/ui';

import { SwapStatus } from '../helpers/getSwapStatus';
import { WaitForCompleteModal } from '../ui/WaitForCompleteModal';

import { SwapCalculateResult } from './useSwapCalculate';

type SwapInfo = SwapCalculateResult & { swapStatus: SwapStatus | null };

const $swapInfo = createStore<SwapInfo | null>(null);
const setSwapInfo = createEvent<SwapInfo>();
const setSwapStatus = createEvent<SwapInfo['swapStatus']>();
const swap = createEvent<SwapCalculateResult>();

const swapFx = createEffect<SwapCalculateResult, void, void>(
  async (calculate) => {
    const {
      transactionRequest,
      tokenAmountIn,
      tokenAmountOut,
      approveTo,
      from,
      transactionType,
      kind,
    } = calculate;

    setSwapInfo({ ...calculate, swapStatus: null });

    NiceModal.show(WaitForCompleteModal);

    const symbiosis = $symbiosis.getState();

    const walletProvider = web3Modal.getWalletProvider();

    if (!walletProvider) {
      throw new Error('Wallet not connected');
    }

    if (transactionType !== 'evm') {
      throw new Error('Unsupported transaction type');
    }

    if (
      !('chainId' in transactionRequest) ||
      typeof transactionRequest.chainId !== 'number'
    ) {
      throw new Error("Don't found chain");
    }

    await web3Modal.switchNetwork(transactionRequest.chainId);

    const provider = new ethers.providers.Web3Provider(walletProvider);
    const signer = provider.getSigner(from);

    // Approve token
    if (!tokenAmountIn.token.isNative) {
      const approveAmount = utils.parseUnits(
        tokenAmountIn.toSignificant(),
        tokenAmountIn.token.decimals,
      );

      const tokenContract = new ethers.Contract(
        tokenAmountIn.token.address,
        TOKEN,
        signer,
      );

      const allowance = (await tokenContract.allowance(
        from,
        approveTo,
      )) as BigNumber;

      if (allowance.lt(approveAmount)) {
        const approveResponse = await tokenContract.approve(
          approveTo,
          MaxUint256,
        );
        await approveResponse.wait(1);
      }

      setSwapStatus(SwapStatus.APPROVE_TRANSACTION);
    }

    // Send transaction to chain
    const transactionResponse =
      await signer.sendTransaction(transactionRequest);
    setSwapStatus(SwapStatus.SEND_TRANSACTION);

    // Wait for transaction to be mined
    const receipt = await transactionResponse.wait(12);
    setSwapStatus(SwapStatus.MINED_TRANSACTION);

    console.log('receipt:', receipt);

    // Wait for transaction to be completed on recipient chain
    if (kind === 'onchain-swap') {
      await provider.waitForTransaction(receipt.transactionHash);
    } else {
      await symbiosis.waitForComplete({
        chainId: transactionRequest.chainId,
        txId: transactionResponse.hash,
      });
    }

    setSwapStatus(SwapStatus.COMPLETED_TRANSACTION);

    track.event(AnalyticsEvent.SuccessSwap, {
      walletAddress: from,
      fromAmount: Number(tokenAmountIn.toSignificant()),
      fromCurrency: tokenAmountIn.token.name,
      contractAddress: transactionRequest.to,
      toAmount: Number(tokenAmountOut.toSignificant()),
      toCurrency: transactionRequest.to,
    });

    NiceModal.remove(WaitForCompleteModal);
  },
);

swapFx.fail.watch(({ error }) => {
  console.error('Swap failed:', error);
  NiceModal.remove(WaitForCompleteModal);
  NiceModal.show(UnknownSwapModal, {
    title: 'Swap',
    primaryActionName: 'Try again',
    secondaryActionName: 'To home page',
  }).then();
});

sample({
  clock: setSwapInfo,
  target: $swapInfo,
});

$swapInfo.on(setSwapStatus, (swapInfo, swapStatus) =>
  swapInfo ? { ...swapInfo, swapStatus } : swapInfo,
);

sample({
  clock: swap,
  target: swapFx,
});

export const useSwap = () => {
  const units = useUnit({
    swap,
    isLoadingSwap: swapFx.pending,
    swapInfo: $swapInfo,
  });

  const subscribeSuccessSwap = (
    watcher?: (params: SwapCalculateResult) => void,
  ) => swapFx.done.watch(({ params }) => watcher?.(params));

  return { ...units, subscribeSuccessSwap };
};
