import React from 'react';

import { utils } from 'ethers';

import { QueryKey } from '@/shared/const';
import { getSharePriceDexVault } from '@/shared/hooks/vault/getSharePriceDexVault';
import { useWeb3ModalAccount } from '@/shared/lib';
import {
  Maybe,
  Money,
  Nullable,
  useGetPriceApiV1MarketDataPriceGet,
  Vault,
  VaultDex,
  VaultMin,
} from '@/shared/types';
import { convertToUsd, fromWei, VaultCurrency } from '@/shared/utils';

type UseWithdrawCalculator = {
  yourWithdraw: Money;
  yourWithdrawUsd: Money;
  currentRate: Money;
  timer: string;
};

export const useWithdrawCalculator = (
  vaultContract: Nullable<Vault | VaultMin | VaultDex>,
  amountToWithdraw: Maybe<string> = '0',
  token: string | VaultCurrency,
  chainId: number,
): UseWithdrawCalculator => {
  const { data } = useGetPriceApiV1MarketDataPriceGet(
    {
      token,
      chain_id: chainId,
    },
    {
      query: {
        queryKey: [QueryKey.TokenPrice, token, chainId],
        enabled: Boolean(token) && Boolean(chainId),
      },
    },
  );

  const tokenPrice = Number(data?.data?.data?.price ?? 1);

  const { address } = useWeb3ModalAccount();
  const [yourWithdraw, setYourWithdraw] = React.useState<Money>(0.0);
  const [yourWithdrawUsd, setYourWithdrawUsd] = React.useState<Money>(0.0);
  const [currentRate, setCurrentRate] = React.useState<Money>(0.0);
  const [timer, setTimer] = React.useState<string>('00:00');

  const fetchData = React.useCallback(async () => {
    if (!address || !vaultContract) {
      return;
    }

    const isDexVault = !('sharePrice' in vaultContract);

    const decimals = await vaultContract.decimals();
    const weiAmountToWithdraw = utils.parseUnits(amountToWithdraw, decimals);

    if (isDexVault) {
      const sharePriceUsdBN = await getSharePriceDexVault(
        vaultContract.address,
        chainId,
        vaultContract.provider,
      );

      const tokenPriceUsdBN = utils.parseUnits(String(tokenPrice), decimals);

      const priceBN = sharePriceUsdBN
        .mul(BigInt(10 ** decimals))
        .div(tokenPriceUsdBN);

      const price = fromWei(priceBN, decimals) ?? 0;

      const withdrawTokens = price * Number(amountToWithdraw);
      const withdrawUsd = withdrawTokens * tokenPrice;

      const currentRate = tokenPrice;
      //
      setYourWithdraw(withdrawTokens);
      setYourWithdrawUsd(withdrawUsd);
      setCurrentRate(currentRate);
    } else {
      const sharePrice = await vaultContract.sharePrice();
      // todo: check calculation, after change logic
      const weiYourWithdraw = weiAmountToWithdraw
        .mul(sharePrice)
        .div(BigInt(10 ** decimals));

      const yourWithdrawTokens = fromWei(weiYourWithdraw, decimals);
      const yourWithdrawUsd = convertToUsd(yourWithdrawTokens, tokenPrice);

      const currentRate = tokenPrice;

      setYourWithdraw(yourWithdrawTokens);
      setYourWithdrawUsd(yourWithdrawUsd);
      setCurrentRate(currentRate);
    }
  }, [address, amountToWithdraw, tokenPrice, vaultContract]);

  React.useEffect(() => {
    fetchData();

    if (!amountToWithdraw || amountToWithdraw === '0') {
      setTimer('00:00');
      return;
    }

    let countdown = 15;

    const updateTimer = () => {
      if (countdown <= 0) {
        fetchData();
        countdown = 15;
      } else {
        countdown -= 1;
      }
      setTimer(`00:${countdown < 10 ? '0' : ''}${countdown}`);
    };

    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [amountToWithdraw, fetchData]);

  return {
    yourWithdraw,
    yourWithdrawUsd,
    currentRate,
    timer,
  };
};
