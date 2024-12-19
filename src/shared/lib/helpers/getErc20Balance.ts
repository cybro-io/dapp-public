import { ethers, utils, constants } from 'ethers';

import TokenErc20Abi from '@/app/abi/token.json';
import { getProviderByChainId } from '@/entities/LiFi';
import { Token } from '@/shared/types';

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
    const contractAddress = new ethers.Contract(
      tokenAddress,
      TokenErc20Abi,
      provider,
    ) as Token;

    const decimals = await contractAddress.decimals();
    const balanceOf = await contractAddress.balanceOf(walletAddress);

    return utils.formatUnits(balanceOf, decimals);
  }

  const balance = await provider.getBalance(walletAddress);

  return utils.formatEther(balance);
};
