import { TokenAmount } from '@lifi/sdk';
import { utils } from 'ethers';

import { Nullable } from '@/shared/types';

export const convertAmountFromTokenAmount = (token: Nullable<TokenAmount>) => {
  if (!token || !token.amount) {
    return '0';
  }

  return utils.formatUnits(token.amount, token.decimals);
};
