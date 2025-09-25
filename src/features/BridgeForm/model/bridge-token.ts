import { Options } from '@layerzerolabs/lz-v2-utilities';
import { waitForMessageReceived } from '@layerzerolabs/scan-client';
import type { DefaultError } from '@tanstack/query-core';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { BigNumber, ethers, providers, utils } from 'ethers';

import { createOftContract, createTokenContract } from '@/shared/lib';
import { SendParamStruct } from '@/shared/types/__generated/contracts/Oft';

import { appKit } from '../../../app/providers';

interface BridgeTokenProps {
  oftAdapterContractAddress: string;
  dstEid: number;
  srcEid: number;
  receivingAccountAddress: string;
  amount: string;

  events?: {
    onStartApprove?: () => void;
    onFinishApprove?: (txId: string, chainId: number) => void;

    onSendTransactionOnSourceChain?: () => void;
    onFinishTransactionOnSourceChain?: (txId: string, chainId: number) => void;

    onStartWaitLayerZero?: () => void;
    onFinishWaitLayerZero?: (dstTxId: string, chainId: number) => void;
  };
}

export const bridgeToken = async (props: BridgeTokenProps) => {
  const {
    oftAdapterContractAddress,
    srcEid,
    dstEid,
    receivingAccountAddress,
    amount,
    events,
  } = props;

  const walletProvider = appKit.getWalletProvider();

  if (!walletProvider) {
    throw new Error('Wallet provider is missing');
  }

  const sender = new providers.Web3Provider(walletProvider).getSigner();
  const senderAddress = await sender.getAddress();

  const oftAdapterContract = createOftContract(
    oftAdapterContractAddress,
    sender,
  );

  const erc20TokenAddress = await oftAdapterContract.token();
  const erc20TokenContract = createTokenContract(erc20TokenAddress, sender);

  // params
  const amountInWei = utils.parseEther(amount);
  const receiverAddressInBytes32 = ethers.utils.hexZeroPad(
    receivingAccountAddress,
    32,
  );

  // Step 1: the sender approves his erc20 tokens for the OFTAdapter contract
  const allowance = (await erc20TokenContract.allowance(
    senderAddress,
    oftAdapterContractAddress,
  )) as BigNumber;

  if (allowance.lt(amountInWei)) {
    events?.onStartApprove?.();

    const approveTx = await erc20TokenContract.approve(
      oftAdapterContractAddress,
      amountInWei,
    );

    await approveTx.wait();

    events?.onFinishApprove?.(approveTx.hash, approveTx.chainId);
    console.log('sendOFT - approve tx:', approveTx.hash);
  }

  // step 2: send tx on source chain
  // Set the required options for cross-chain send
  const options = Options.newOptions()
    // addExecutorNativeDropOption is optional
    .addExecutorLzReceiveOption(100000, 0)
    .toHex()
    .toString();

  // Set the send param
  const sendParam: SendParamStruct = {
    dstEid,
    to: receiverAddressInBytes32,
    amountLD: amountInWei,
    minAmountLD: amountInWei,
    extraOptions: options,
    oftCmd: '0x',
    composeMsg: '0x',
  };

  events?.onSendTransactionOnSourceChain?.();
  const [nativeFee] = await oftAdapterContract.quoteSend(sendParam, false);
  const sendTx = await oftAdapterContract.send(
    sendParam,
    { nativeFee, lzTokenFee: 0 }, // set 0 for lzTokenFee
    senderAddress, // refund address
    { value: nativeFee },
  );

  await sendTx.wait();
  events?.onFinishTransactionOnSourceChain?.(sendTx.hash, sendTx.chainId);

  // step 3: Wait for cross-chain tx finalization by LayerZero
  events?.onStartWaitLayerZero?.();

  const deliveredMsg = await waitForMessageReceived(srcEid, sendTx.hash);
  events?.onFinishWaitLayerZero?.(
    deliveredMsg.dstTxHash,
    deliveredMsg.dstChainId,
  );
};

export const useBridgeTokenMutation = (
  options?: Omit<
    UseMutationOptions<void, Error, BridgeTokenProps, unknown>,
    'mutationFn' | 'mutationKey'
  >,
) => {
  return useMutation<void, DefaultError, BridgeTokenProps>({
    mutationFn: bridgeToken,
    mutationKey: ['bridgeToken'],
    ...options,
  });
};
