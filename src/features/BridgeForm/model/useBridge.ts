import React, { useCallback, useEffect } from 'react';

import { useSwitchNetwork } from '@web3modal/ethers5/react';
import { BigNumber } from 'bignumber.js';

import {
  isErrorUserRejected,
  triggerToast,
  useErc20Balance,
  useWeb3ModalAccount,
} from '@/shared/lib';
import { ToastType } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

import { bridgeChains } from '../lib/constants';
import { useBridgeTokenMutation } from '../model/bridge-token';

import { BridgeStep } from './types';
import { useBridgeForm } from './useBridgeForm';

export const useBridge = () => {
  const { address, chainId } = useWeb3ModalAccount();
  const { switchNetwork } = useSwitchNetwork();

  const [step, setStep] = React.useState<BridgeStep>(
    BridgeStep.approveOnSourceChain,
  );

  const {
    fetchBalance,
    balance,
    isLoading: isLoadingBalance,
  } = useErc20Balance();

  const { mutate: bridgeTokenMutate, isPending: isLoadingBridgeToken } =
    useBridgeTokenMutation({
      onSuccess(_data, args) {
        triggerToast({
          message: `${formatUserMoney(args.amount)} CYBRO bridged to ${destinationChain.name}`,
          description: 'Check your updated balance.',
        });
      },
      onError(error) {
        if (!isErrorUserRejected(error)) {
          triggerToast({
            message: `Something went wrong`,
            description:
              'We were unable to complete the current operation. Try again or connect feedback.',
            type: ToastType.Error,
          });
        }

        console.error(error);
      },
    });

  const form = useBridgeForm((values) => {
    const receivingAccountAddress = values.address || address;

    if (!receivingAccountAddress || !destinationChain || !sourceChain) {
      return;
    }

    setStep(BridgeStep.approveOnSourceChain);

    bridgeTokenMutate({
      amount: values.amount,
      receivingAccountAddress,
      dstEid: destinationChain.endpointId,
      srcEid: sourceChain.endpointId,
      oftAdapterContractAddress: sourceChain.oftAdapterContractAddress,
      events: {
        onSendTransactionOnSourceChain() {
          setStep(BridgeStep.sendTxOnSourcheChain);
        },
        onStartWaitLayerZero() {
          setStep(BridgeStep.waitLayerZero);
        },
        onFinishTransactionOnSourceChain() {
          getBalance();
        },
      },
    });
  });

  const destinationChain = bridgeChains.find(
    (chain) => chain.id === form.values.destinationChain,
  )!;

  const sourceChain = bridgeChains.find(
    (chain) => chain.id === form.values.sourceChain,
  )!;

  const isNeedChangeChain = chainId !== sourceChain.id;
  const isInsufficientBalance = new BigNumber(form.values.amount).isGreaterThan(
    balance,
  );

  const submitText = React.useMemo(() => {
    if (isLoadingBridgeToken) {
      return `Bridging CYBRO...`;
    }

    if (isNeedChangeChain) {
      return 'Switch network';
    }

    if (isInsufficientBalance) {
      return 'Insufficient balance';
    }

    return null;
  }, [isInsufficientBalance, isNeedChangeChain, isLoadingBridgeToken]);

  const handleSubmit = () => {
    if (isNeedChangeChain) {
      switchNetwork(sourceChain.id);
      return;
    }

    form.handleSubmit();
  };

  const isSubmitDisabled =
    !isNeedChangeChain &&
    (!form.isValid || isInsufficientBalance || isLoadingBridgeToken);

  const getBalance = useCallback(() => {
    if (!sourceChain || !address) {
      return;
    }

    fetchBalance(address, sourceChain.id, sourceChain.tokenAddress);
  }, [sourceChain, address]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return {
    form,
    balance,
    isLoadingBalance,
    address,
    bridgeChains,
    sourceChain,
    destinationChain,
    isLoadingBridgeToken,
    submitText,
    handleSubmit,
    isSubmitDisabled,
    step,
  };
};
