import { SelectedToken } from '@/entities/fund';
import { Nullable } from '@/shared/types';

export const getUniqueTokenId = (...args: Array<string | number>) => {
  return `${args.join('_').toLowerCase()}`;
};

export const getUniqueSelectedTokenId = (token: Nullable<SelectedToken>) => {
  if (!token) {
    return '';
  }

  return token.isCrypto
    ? getUniqueTokenId(token.address, token.chain.id)
    : getUniqueTokenId(token.symbol, token.id);
};
