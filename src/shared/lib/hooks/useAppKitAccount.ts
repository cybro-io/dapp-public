'use client';

import { useEffect } from 'react';

import { useAppKitAccount as useAppKitAccountVendor } from '@reown/appkit-controllers/react';
import { useLocalStorage } from 'usehooks-ts';

import { useAuthWallet } from '@/entities/Auth';
import { Maybe } from '@/shared/types';

export const useAppKitAccount = () => {
  const { address, isConnected, ...restProps } = useAppKitAccountVendor({
    namespace: 'eip155',
  });
  const [testAddress] = useLocalStorage<string>('testAddress', '');

  const { authWallet } = useAuthWallet();
  useEffect(() => {
    if (address) {
      authWallet(address);
    }
  }, [address]);

  return {
    ...restProps,
    isConnected: testAddress ? true : isConnected,
    address: testAddress || (address as Maybe<string>),
  };
};
