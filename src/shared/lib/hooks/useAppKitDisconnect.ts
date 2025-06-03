'use client';

import { useDisconnect } from '@reown/appkit/react';

/** @Description Custom hook Disconnect from AppKit, when native method return error */
export const useAppKitDisconnect = () => {
  const { disconnect: vendorDisconnect } = useDisconnect();

  const disconnect = () => {
    vendorDisconnect().catch(() => {
      localStorage.removeItem('@w3m/connected_wallet_image_url');
      localStorage.removeItem('@w3m/wallet_id');
      localStorage.removeItem('@w3m/connected_connector');
      location.reload();
    });
  };

  return { disconnect };
};
