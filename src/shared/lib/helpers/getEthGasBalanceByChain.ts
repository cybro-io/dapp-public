import { ChainId } from 'symbiosis-js-sdk';

import { $symbiosis, formatUnits } from '@/shared/lib';

/**
 * Get gas token balance by chain in evm wallet
 * @param chainId
 * @param walletAddress
 */
export const getEthGasBalanceByChain = async (
  chainId: ChainId,
  walletAddress: string,
) => {
  try {
    const symbiosis = $symbiosis.getState();
    const provider = symbiosis.getProvider(chainId);

    if (!provider) {
      throw new Error('Provider not found');
    }

    const balance = await provider.getBalance(walletAddress);

    const token = symbiosis.findToken('', chainId);

    return formatUnits(balance, token?.decimals);
  } catch (error) {
    return String('0.0');
  }
};
