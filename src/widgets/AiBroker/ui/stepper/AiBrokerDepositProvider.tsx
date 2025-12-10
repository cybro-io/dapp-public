import React, { useEffect } from 'react';

import { BigNumber } from 'bignumber.js';

import { SelectedTokenFiat, convertToSelectedToken } from '@/entities/fund';
import { useMunzenCurrencies } from '@/entities/Munzen';
import {
  FundDepositContextProvider,
  isAvailableFiatToken,
} from '@/features/FundDeposit';
import { useAiBrokerContext } from '@/widgets/AiBroker';
import { AiBrokerMessageType } from '@/widgets/AiBroker/model/types';
import { FundCalculatorContext } from '@/widgets/FundCalculator';

export const AiBrokerDepositProvider = ({
  children,
}: React.PropsWithChildren) => {
  const { brokerHistory, selectedFund } = useAiBrokerContext();
  const { currencies, fetchCurrencies } = useMunzenCurrencies();

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const isOnRamp = Boolean(
    brokerHistory.chat.find(
      (message) =>
        message.assessmentId === brokerHistory.assessmentId &&
        message.type === AiBrokerMessageType.answer &&
        message.content === 'Fiat (traditional currency)',
    ),
  );

  const findCurrency = currencies?.find((curreny) => curreny.ticker === 'EUR');

  if (!selectedFund) {
    return <React.Fragment>{children}</React.Fragment>;
  }

  const vaultValue = {
    ...selectedFund,
    chain: selectedFund.chain_name,
    is_deposit_disabled: false,
    fund_type: selectedFund.fund_type,
    tokens: selectedFund.tokens.map((fundToken) => ({
      address: fundToken.address,
      decimals: fundToken.decimal_places,
      icon: fundToken.icon,
      name: fundToken.name,
    })),
    apy: new BigNumber(selectedFund.apy).multipliedBy(100).toNumber(),
  };

  const isFiat = selectedFund.tokens.some((token) =>
    isAvailableFiatToken({
      isCrypto: true,
      symbol: token.name,
      decimals: token.decimal_places,
      logoUrl: '',
      address: token.address,
      chain: {
        id: selectedFund.chain_id,
        logoUrl: '',
        name: selectedFund.chain_name,
      },
    }),
  );

  const defaultSelectedToken: SelectedTokenFiat | undefined =
    isOnRamp && findCurrency && isFiat
      ? {
          isCrypto: false,
          symbol: findCurrency.tickerWithNetwork,
          decimals: findCurrency.decimals,
          logoUrl: findCurrency.logoUrl,
          id: findCurrency.id,
          name: findCurrency.name,
        }
      : undefined;

  return (
    <FundCalculatorContext.Provider
      value={{
        vault: vaultValue,
        defaultAddress: brokerHistory.address,
        defaultSelectedToken,
      }}
    >
      <FundDepositContextProvider>{children}</FundDepositContextProvider>
    </FundCalculatorContext.Provider>
  );
};
