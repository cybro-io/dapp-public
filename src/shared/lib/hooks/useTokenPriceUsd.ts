import { useMemo } from 'react';

import { ChainId } from '@lifi/sdk';

import { useSwapTokens } from '@/entities/SwapToken';

type UseTokenPriceUsdProps = {
  address: string;
  chainId: ChainId;
} | null;

export const useTokenPriceUsd = (props: UseTokenPriceUsdProps) => {
  const { isLoading, findToken } = useSwapTokens();

  const price = useMemo(() => {
    if (!props) {
      return '0';
    }

    return findToken(props.address, props.chainId)?.priceUSD ?? '0';
  }, [props, findToken]);

  return { isLoading, price };
};
