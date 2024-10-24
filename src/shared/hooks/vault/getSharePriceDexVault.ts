import { ethers, utils } from 'ethers';

import TOKEN from '@/app/abi/token.json';
import vaultDexAbi from '@/app/abi/vaultDex.json';
import {
  getPriceApiV1MarketDataPriceGet,
  Token,
  VaultDex,
} from '@/shared/types';

export const getSharePriceDexVault = async (
  vaultAddress: string,
  chainId: number,
  provider: ethers.providers.Provider,
) => {
  // debugger;
  const vaultContract = new ethers.Contract(
    vaultAddress,
    vaultDexAbi,
    provider,
  ) as VaultDex;
  const vaultDecimals = await vaultContract.decimals();

  const token0Address = await vaultContract.token0();
  const decimals0 = await vaultContract.token0Decimals();
  const token0Contract = new ethers.Contract(
    token0Address,
    TOKEN,
    provider,
  ) as Token;
  const symbol0 = await token0Contract.symbol();
  const token0Price = await getPriceApiV1MarketDataPriceGet({
    token: symbol0,
    chain_id: chainId,
  });

  const token1Address = await vaultContract.token1();
  const decimals1 = await vaultContract.token1Decimals();
  const token1Contract = new ethers.Contract(
    token1Address,
    TOKEN,
    provider,
  ) as Token;
  const symbol1 = await token1Contract.symbol();
  const token1Price = await getPriceApiV1MarketDataPriceGet({
    token: symbol1,
    chain_id: chainId,
  });

  const totalSupply = utils.formatUnits(
    await vaultContract.totalSupply(),
    vaultDecimals,
  );
  const [amount0BN, amount1BN] = await vaultContract.getPositionAmounts();

  const amount0 = utils.formatUnits(amount0BN, decimals0);
  const amount1 = utils.formatUnits(amount1BN, decimals1);

  const usdPrice0 = Number(token0Price.data.data?.price ?? '1');
  const usdPrice1 = Number(token1Price.data.data?.price ?? '1');

  const usdValue0 = Number(amount0) * usdPrice0;
  const usdValue1 = Number(amount1) * usdPrice1;

  const usdValue = usdValue0 + usdValue1;

  const sharedPrice = String(usdValue / Number(totalSupply));

  return utils.parseUnits(sharedPrice, vaultDecimals);
};
