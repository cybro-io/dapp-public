import { utils } from 'ethers';

import { createTokenContract } from '@/shared/lib';
import { getPriceApiV1MarketDataPriceGet, VaultDex } from '@/shared/types';

export const getPriceDexVaultUsd = async (
  vaultContract: VaultDex,
  chainId: number,
) => {
  const vaultDecimals = await vaultContract.decimals();
  const provider = vaultContract.provider;

  const token0Address = await vaultContract.token0();
  const decimals0 = await vaultContract.token0Decimals();
  const token0Contract = createTokenContract(token0Address, provider);
  const symbol0 = await token0Contract.symbol();
  const token0PriceUsd = Number(
    (
      await getPriceApiV1MarketDataPriceGet({
        token: symbol0,
        chain_id: chainId,
      })
    ).data.data?.price ?? 0,
  );

  const token1Address = await vaultContract.token1();
  const decimals1 = await vaultContract.token1Decimals();
  const token1Contract = createTokenContract(token1Address, provider);
  const symbol1 = await token1Contract.symbol();
  const token1PriceUsd = Number(
    (
      await getPriceApiV1MarketDataPriceGet({
        token: symbol1,
        chain_id: chainId,
      })
    ).data.data?.price ?? 0,
  );

  const totalSupply = utils.formatUnits(
    await vaultContract.totalSupply(),
    vaultDecimals,
  );
  const [amount0BN, amount1BN] = await vaultContract.getPositionAmounts();

  const amount0 = utils.formatUnits(amount0BN, decimals0);
  const amount1 = utils.formatUnits(amount1BN, decimals1);

  const usdValue0 = Number(amount0) * token0PriceUsd;
  const usdValue1 = Number(amount1) * token1PriceUsd;

  const usdValue = usdValue0 + usdValue1;

  return usdValue / Number(totalSupply);
};
