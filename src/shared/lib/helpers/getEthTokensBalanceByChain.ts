import { Multicall } from 'ethereum-multicall';
import { ChainId, MULTICALL_ADDRESSES, Token } from 'symbiosis-js-sdk';

import { $symbiosis, formatUnits, getEthGasBalanceByChain } from '@/shared/lib';

const erc20Abi = ['function balanceOf(address) view returns (uint256)'];

/**
 * Get tokens balance by chain in evm wallet
 * @param chainId
 * @param walletAddress
 * @param tokens
 */
export const getEthTokensBalanceByChain = async (
  chainId: ChainId,
  walletAddress: string,
  tokens: Token[],
) => {
  try {
    const symbiosis = $symbiosis.getState();
    const provider = symbiosis.getProvider(chainId);

    if (!provider) {
      throw new Error('Provider not found');
    }

    const multicallAddress = MULTICALL_ADDRESSES[chainId];

    const multicall = new Multicall({
      ethersProvider: provider,
      tryAggregate: true,
      multicallCustomContractAddress: multicallAddress
        ? multicallAddress
        : undefined,
    });

    const calls = tokens
      .filter((token) => token.address)
      .map((token) => ({
        abi: erc20Abi,
        calls: [
          {
            reference: 'balanceOfCall',
            methodName: 'balanceOf',
            methodParameters: [walletAddress],
          },
        ],
        reference: token.address,
        contractAddress: token.address,
      }));

    const result = await multicall.call(calls).then(({ results }) => results);

    const balances = Object.entries(result)
      .map(([tokenAddress, value]) => {
        const token = symbiosis.findToken(tokenAddress, chainId);

        return [
          tokenAddress,
          formatUnits(
            value.callsReturnContext[0].returnValues,
            token?.decimals,
          ),
        ];
      })
      .filter(([_, value]) => Number(value) > 0);

    const gasBalance = await getEthGasBalanceByChain(chainId, walletAddress);

    return {
      [chainId]: { ...Object.fromEntries(balances), '': gasBalance } as Record<
        string,
        string
      >,
    };
  } catch (error) {
    return { [chainId]: {} };
  }
};
