import { useWeb3ModalAccount as useWeb3ModalAccountVendor } from '@web3modal/ethers5/react';
import { useLocalStorage } from 'usehooks-ts';

import { Maybe } from '@/shared/types';

export const useWeb3ModalAccount = () => {
  const { address, ...restProps } = useWeb3ModalAccountVendor();
  const [testAddress] = useLocalStorage<string>('testAddress', '');

  return { ...restProps, address: testAddress || (address as Maybe<string>) };
};
