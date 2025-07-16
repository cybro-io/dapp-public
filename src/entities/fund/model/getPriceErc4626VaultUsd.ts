import { createTokenContract } from '@/shared/lib';
import { getPriceApiV1MarketDataPriceGet, Vault } from '@/shared/types';

export const getPriceErc4626VaultUsd = async (
  vaultContract: Vault,
  chainId: number,
) => {
  const provider = vaultContract.provider;
  const tokenAddress = await vaultContract.asset();

  const tokenContract = createTokenContract(tokenAddress, provider);
  const symbol = await tokenContract.symbol();

  const response = await getPriceApiV1MarketDataPriceGet({
    token: symbol,
    chain_id: chainId,
  });

  return Number(response.data.data?.price ?? 0);
};
