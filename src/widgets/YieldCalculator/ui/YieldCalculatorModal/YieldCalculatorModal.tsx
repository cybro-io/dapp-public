'use client';

import React from 'react';

import { useModal } from '@/app/providers';
import { YieldSwitchOptions } from '@/shared/const';
import {
  ComponentWithProps,
  Money,
  Nullable,
  Vault,
  Token,
  TokenResponseData,
} from '@/shared/types';
import { ModalLayout } from '@/shared/ui';
import { VaultCurrency } from '@/shared/utils';
import { YieldCalculatorBody } from '@/widgets/YieldCalculator';

export type YieldCalculatorModalProps = {
  currency: VaultCurrency;
  vaultId: number;
  chainId: number;
  vaultContract: Nullable<Vault>;
  tokenContract: Nullable<Token>;
  tokenIcon: string;
  userDeposit: Nullable<Money>;
  activeTab: YieldSwitchOptions;
  chain: string;
  apy: number;
  tokens: TokenResponseData[];
  fundType: string;
};

export const YieldCalculatorModal: ComponentWithProps<unknown> = () => {
  const { props } = useModal() as unknown as {
    props: YieldCalculatorModalProps;
  };
  const {
    activeTab,
    currency,
    apy,
    chain,
    chainId,
    vaultContract,
    tokenContract,
    tokenIcon,
    vaultId,
    tokens,
    fundType,
  } = props;

  const title =
    activeTab === YieldSwitchOptions.Deposit
      ? 'Vault Deposit'
      : 'Vault Withdraw';

  return (
    <ModalLayout title={title}>
      <YieldCalculatorBody
        vaultId={vaultId}
        currency={currency}
        actionType={activeTab}
        tokenIcon={tokenIcon}
        chainId={chainId}
        vaultContract={vaultContract}
        tokenContract={tokenContract}
        chain={chain}
        apy={apy}
        tokens={tokens}
        fundType={fundType}
      />
    </ModalLayout>
  );
};
