import { ChainId } from '@lifi/sdk';
import { constants } from 'ethers';

import { SelectedToken } from '@/entities/fund';
import {
  getUniqueSelectedTokenId,
  getUniqueTokenId,
} from '@/entities/SwapToken';

const availableFiatTokens = [
  getUniqueTokenId('0x4300000000000000000000000000000000000003', ChainId.BLS), // USDB
  getUniqueTokenId('', ChainId.BLS), // ETH
  getUniqueTokenId(constants.AddressZero, ChainId.BLS), // ETH
];

export const isAvailableFiatToken = (token: SelectedToken) => {
  return availableFiatTokens.includes(getUniqueSelectedTokenId(token));
};
