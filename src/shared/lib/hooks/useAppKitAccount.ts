'use client';

import { useAppKitAccount as useAppKitAccountVendor } from '@reown/appkit-controllers/react';
import { useLocalStorage } from 'usehooks-ts';

import { Maybe } from '@/shared/types';

export const useAppKitAccount = () => {
  const { address, isConnected, ...restProps } = useAppKitAccountVendor({
    namespace: 'eip155',
  });
  const [testAddress] = useLocalStorage<string>('testAddress', '');

  return {
    ...restProps,
    isConnected: testAddress ? true : isConnected,
    address: testAddress || (address as Maybe<string>),
  };
};
