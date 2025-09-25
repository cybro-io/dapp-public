import { ChainId } from '@lifi/sdk';
import { useQuery } from '@tanstack/react-query';
import BigNumberJs from 'bignumber.js';
import { BigNumber, ethers, utils } from 'ethers';

import vaultSeasonAbi from '@/shared/abi/vaultSeason.json';
import { createTokenContract, getProviderByChainId } from '@/shared/lib';
import { VaultSeason } from '@/shared/types';

export const useSeasonVaultPools = (
  vaultAddress: string,
  chainId: ChainId,
  enabled: boolean,
) => {
  return useQuery({
    enabled: Boolean(vaultAddress) && enabled,
    queryFn: async () => {
      try {
        const provider = getProviderByChainId(chainId);

        if (!provider) {
          throw new Error('useSeasonVaultPools() provider not found');
        }

        const vaultContract = new ethers.Contract(
          vaultAddress,
          vaultSeasonAbi,
          provider,
        ) as VaultSeason;

        const assetAddress = await vaultContract.asset();
        const token0Address = await vaultContract.token0();
        const token1Address = await vaultContract.token1();

        const isPriceToken0 = assetAddress === token0Address;

        const token0Decimals = await vaultContract.token0Decimals();
        const token1Decimals = await vaultContract.token1Decimals();

        const pool = await vaultContract.pools('500');
        const [sqrtPriceX96] = await vaultContract.getPoolState(pool);

        const priceToken = decodePriceFromSqrtPriceX96(
          sqrtPriceX96,
          token0Decimals,
          token1Decimals,
        );

        // token0 free balance STABLE
        const token0Contract = createTokenContract(token0Address, provider);
        const token0Name = await token0Contract.symbol();

        let balance0 = Number(
          utils.formatUnits(
            await token0Contract.balanceOf(vaultAddress),
            token0Decimals,
          ),
        );

        if (!isPriceToken0) {
          balance0 = BigNumberJs(balance0).multipliedBy(priceToken).toNumber();
        }

        // token1 free balance
        const token1Contract = createTokenContract(token1Address, provider);
        const token1Name = await token1Contract.symbol();

        let balance1 = Number(
          utils.formatUnits(
            await token1Contract.balanceOf(vaultAddress),
            token1Decimals,
          ),
        );

        if (isPriceToken0) {
          balance1 = BigNumberJs(balance1).div(priceToken).toNumber();
        }

        // token0 investing
        const token0VaultAddress = await vaultContract.token0Vault();
        const token0VaultContract = new ethers.Contract(
          token0VaultAddress,
          vaultSeasonAbi,
          provider,
        ) as VaultSeason;

        let token0VaultAssets = Number(
          utils.formatUnits(
            await token0VaultContract.totalAssets(),
            token0Decimals,
          ),
        );

        if (!isPriceToken0) {
          token0VaultAssets = BigNumberJs(token0VaultAssets)
            .multipliedBy(priceToken)
            .toNumber();
        }

        // token1 investing
        const token1VaultAddress = await vaultContract.token1Vault();
        const token1VaultContract = new ethers.Contract(
          token1VaultAddress,
          vaultSeasonAbi,
          provider,
        ) as VaultSeason;

        let token1VaultAssets = Number(
          utils.formatUnits(
            await token1VaultContract.totalAssets(),
            token1Decimals,
          ),
        );

        if (isPriceToken0) {
          token1VaultAssets = BigNumberJs(token1VaultAssets)
            .div(priceToken)
            .toNumber();
        }

        // position amounts
        const [token0AmountWei, token1AmountWei] =
          await vaultContract.getPositionAmounts();

        let token0Amount = Number(
          utils.formatUnits(token0AmountWei, token0Decimals),
        );

        if (!isPriceToken0) {
          token0Amount = BigNumberJs(token0Amount)
            .multipliedBy(priceToken)
            .toNumber();
        }

        let token1Amount = Number(
          utils.formatUnits(token1AmountWei, token1Decimals),
        );

        if (isPriceToken0) {
          token1Amount = BigNumberJs(token1Amount).div(priceToken).toNumber();
        }

        return [
          {
            name: token0Name,
            free: balance0,
            investmentInIndex: token0VaultAssets,
            liquidityPosition: token0Amount,
          },
          {
            name: token1Name,
            free: balance1,
            investmentInIndex: token1VaultAssets,
            liquidityPosition: token1Amount,
          },
        ];
      } catch (e) {
        return null;
      }
    },
    queryKey: ['SeasonVaultPools', vaultAddress, chainId],
    refetchInterval: 30_000,
    retry: 3,
  });
};

function decodePriceFromSqrtPriceX96(
  sqrtPriceX96: BigNumber,
  decimalsToken0: number,
  decimalsToken1: number,
) {
  const Q96 = BigInt(2) ** BigInt(96);
  const sqrtPrice = Number(sqrtPriceX96) / Number(Q96);
  const price = sqrtPrice ** 2;

  return price * 10 ** (decimalsToken0 - decimalsToken1); // price token1 in token0
}
