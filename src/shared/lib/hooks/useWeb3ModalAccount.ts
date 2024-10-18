import { useWeb3ModalAccount as useWeb3ModalAccountVendor } from '@web3modal/ethers5/react';

import { Maybe } from '@/shared/types';

export const useWeb3ModalAccount = () => {
  const { address, ...restProps } = useWeb3ModalAccountVendor();

  return { ...restProps, address: address as Maybe<string> };
};
