import { ChainId } from '@lifi/sdk';
import { constants } from 'ethers';

import { SelectedToken } from '@/entities/fund';
import {
  getUniqueSelectedTokenId,
  getUniqueTokenId,
} from '@/entities/SwapToken';

const availableFiatTokens: { uniqId: string; tickerWithNetwork: string }[] = [
  // {
  //   uniqId: getUniqueTokenId(
  //     '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
  //     ChainId.ARB,
  //   ),
  //   tickerWithNetwork: 'USDC-ARB',
  // }, // USDC (Arbitrum)
  // {
  //   uniqId: getUniqueTokenId(
  //     '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  //     ChainId.BAS,
  //   ),
  //   tickerWithNetwork: 'USDC-BASE',
  // }, // USDC (Base)
  // { uniqId: getUniqueTokenId('', ChainId.BLS), tickerWithNetwork: 'ETH-BLAST' }, // ETH
  // {
  //   uniqId: getUniqueTokenId(constants.AddressZero, ChainId.BLS),
  //   tickerWithNetwork: 'ETH-BLAST',
  // }, // ETH
];

export const isAvailableFiatToken = (token: SelectedToken) => {
  return availableFiatTokens.some(
    (availableToken) =>
      availableToken.uniqId === getUniqueSelectedTokenId(token),
  );
};

export const getTickerWithNetwork = (token: SelectedToken) => {
  return availableFiatTokens.find(
    (availableToken) =>
      availableToken.uniqId === getUniqueSelectedTokenId(token),
  )?.tickerWithNetwork;
};
