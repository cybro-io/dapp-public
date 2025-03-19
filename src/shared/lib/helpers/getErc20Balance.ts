import { utils, constants } from 'ethers';

import { getProviderByChainId } from '@/entities/LiFi';
import { createTokenContract } from '@/shared/lib';

export const getErc20Balance = async (
  walletAddress: string,
  tokenAddress: string,
  chainId: number,
) => {
  const provider = getProviderByChainId(chainId);

  if (!provider) {
    throw new Error('No provider found');
  }

  if (tokenAddress && tokenAddress !== constants.AddressZero) {
    const contractAddress = createTokenContract(tokenAddress, provider);

    const decimals = await contractAddress.decimals();
    const balanceOf = await contractAddress.balanceOf(walletAddress);

    return utils.formatUnits(balanceOf, decimals);
  }

  const balance = await provider.getBalance(walletAddress);

  return utils.formatEther(balance);
};
