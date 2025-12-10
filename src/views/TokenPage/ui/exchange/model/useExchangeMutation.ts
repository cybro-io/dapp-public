import { useAppKitProvider } from '@reown/appkit/react';
import { DefaultError, useMutation } from '@tanstack/react-query';
import { providers, utils } from 'ethers';

import { appKit } from '@/app/providers';
import { createExchangeContract, createTokenContract } from '@/shared/lib';
import { increaseGasLimit } from '@/shared/utils';

import { cybroContractAddress } from '../constants/cybro';

import { ExchangeDirection } from './types';

interface UseExchangeMutation {
  amount: string;
  address: string;
  direction: ExchangeDirection;
  usdbOrWeth: boolean;
  tokenAddress: string;
}

export const useExchangeMutation = () => {
  return useMutation<void, DefaultError, UseExchangeMutation>({
    mutationFn: async ({
      amount,
      address,
      usdbOrWeth,
      direction,
      tokenAddress,
    }) => {
      const walletProvider = appKit.getWalletProvider();
      if (!walletProvider) {
        throw new Error('Provider not found');
      }

      const weiAmount = utils.parseUnits(amount);
      const signer = new providers.Web3Provider(walletProvider).getSigner();

      const exchangeContract = createExchangeContract(
        cybroContractAddress.exchange,
        signer,
      );

      const amountSend =
        direction === ExchangeDirection.buy
          ? await exchangeContract.viewBuyByToken(
              weiAmount.toString(),
              usdbOrWeth,
            )
          : weiAmount;

      const tokenContract = createTokenContract(tokenAddress, signer);

      const allowance = await tokenContract.allowance(
        address,
        exchangeContract.address,
      );

      if (allowance.lt(amountSend)) {
        const approveTx = await tokenContract.approve(
          exchangeContract.address,
          amountSend,
        );
        await approveTx.wait();
      }

      const estimateFunction =
        direction === ExchangeDirection.buy
          ? exchangeContract.estimateGas.buy
          : exchangeContract.estimateGas.sell;

      const estimateGas = await estimateFunction(
        amountSend.toString(),
        address,
        usdbOrWeth,
      );

      const actionFunction =
        direction === ExchangeDirection.buy
          ? exchangeContract.buy
          : exchangeContract.sell;

      const txAction = await actionFunction(
        amountSend.toString(),
        address,
        usdbOrWeth,
        { gasLimit: increaseGasLimit(estimateGas, 1.35) },
      );

      console.log(txAction);
      await txAction.wait();
    },
  });
};
