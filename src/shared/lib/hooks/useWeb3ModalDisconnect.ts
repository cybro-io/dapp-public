'use client';

import { useDisconnect } from '@web3modal/ethers5/react';

/** @Description Custom hook Disconnect from web3modal, when native method return error */
export const useWeb3ModalDisconnect = () => {
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
