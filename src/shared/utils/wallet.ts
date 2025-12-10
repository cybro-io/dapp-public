import { Maybe } from '@/shared/types';

export const shortenWalletAddress = (
  address: Maybe<`0x${string}` | string>,
  startSlice = 7,
): Maybe<string> => {
  if (!address) return;

  const start = address.slice(0, startSlice);
  const end = address.slice(-3);

  return `${start}...${end}`;
};
