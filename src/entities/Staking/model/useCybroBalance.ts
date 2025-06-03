import { ChainId } from '@lifi/sdk';
import { useQuery } from '@tanstack/react-query';
import { BigNumber } from 'bignumber.js';
import { utils } from 'ethers';

import { getProviderByChainId } from '@/shared/lib';
import { QueryKey } from '@/shared/lib';
import { createLockedTokenContract, createTokenContract } from '@/shared/lib';
import { Maybe, StakingTokensDataLockedCybroAddress } from '@/shared/types';

import { useStakingConfig } from './useStakingConfig';

export interface GetCybroBalanceResponse {
  locked: number;
  cybro: number;
  chainId: number;
}

type ChainIdOrArrayChains<T extends ChainId | Array<ChainId>> =
  T extends ChainId ? GetCybroBalanceResponse : Array<GetCybroBalanceResponse>;

interface UseCybroBalanceProps<T extends ChainId | Array<ChainId>> {
  address: Maybe<string>;
  lockedAddress?: string;
  chainId: T;
}

export const useCybroBalance = <T extends ChainId | Array<ChainId>>({
  address,
  lockedAddress,
  chainId,
}: UseCybroBalanceProps<T>) => {
  const { config } = useStakingConfig();

  const { data, isLoading } = useQuery<ChainIdOrArrayChains<T>>({
    queryKey: [QueryKey.CybroBalance, address, config, lockedAddress, chainId],
    enabled: Boolean(config),
    queryFn: async () => {
      console.log('getCybroBalance');
      if (!address) {
        return defaultCybroBalance as ChainIdOrArrayChains<T>;
      }

      if (!Array.isArray(chainId)) {
        return (await getCybroBalance({
          address,
          chainId,
          cybroTokenAddress: config?.token[chainId as number].cybroAddress,
          lockedCybroAddress:
            lockedAddress ??
            config?.token[chainId as number].lockedCybroAddress,
        })) as ChainIdOrArrayChains<T>;
      }

      return (await Promise.all(
        chainId.map((chain) =>
          getCybroBalance({
            address,
            chainId: chain,
            cybroTokenAddress: config?.token[chain].cybroAddress,
            lockedCybroAddress:
              lockedAddress ?? config?.token[chain].lockedCybroAddress,
          }),
        ),
      )) as ChainIdOrArrayChains<T>;
    },
  });

  return {
    balance: data,
    isLoadingBalance: isLoading,
  };
};

const defaultCybroBalance: GetCybroBalanceResponse = {
  locked: 0,
  cybro: 0,
  chainId: 0,
};

interface GetCybroBalanceProps {
  address: string;
  cybroTokenAddress: Maybe<string>;
  lockedCybroAddress: Maybe<StakingTokensDataLockedCybroAddress>;
  chainId: number;
}

const getCybroBalance = async ({
  address,
  cybroTokenAddress,
  lockedCybroAddress,
  chainId,
}: GetCybroBalanceProps): Promise<GetCybroBalanceResponse> => {
  const provider = getProviderByChainId(chainId);
  if (!provider) {
    return defaultCybroBalance;
  }

  let cybro = 0;
  if (cybroTokenAddress) {
    const cybroContract = createTokenContract(cybroTokenAddress, provider);
    const decimals = await cybroContract.decimals();
    const balance = await cybroContract.balanceOf(address);

    cybro = new BigNumber(utils.formatUnits(balance, decimals) ?? 0)
      .dp(6, BigNumber.ROUND_DOWN)
      .toNumber();
  }

  let locked = 0;
  if (lockedCybroAddress) {
    const lockedTokenContract = createLockedTokenContract(
      lockedCybroAddress,
      provider,
    );

    const decimals = await lockedTokenContract.decimals();
    const balance = await lockedTokenContract.balanceOf(address);
    locked = new BigNumber(utils.formatUnits(balance, decimals) ?? 0)
      .dp(6, BigNumber.ROUND_DOWN)
      .toNumber();
  }

  return {
    locked,
    cybro,
    chainId,
  };
};
