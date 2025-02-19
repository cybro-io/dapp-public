import { SelectedToken } from '@/entities/fund';

export const getUniqueTokenId = (...args: Array<string | number>) => {
  return `${args.join('_').toLowerCase()}`;
};

export const getUniqueSelectedTokenId = (token: SelectedToken) => {
  return token.isCrypto
    ? getUniqueTokenId(token.address, token.chain.id)
    : getUniqueTokenId(token.symbol, token.id);
};
