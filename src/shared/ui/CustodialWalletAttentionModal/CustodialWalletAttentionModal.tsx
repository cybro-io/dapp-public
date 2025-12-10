import React from 'react';

import NiceModal from '@ebay/nice-modal-react';
import { useOnClickOutside } from 'usehooks-ts';

import { Button, Typography } from '@/shared/ui';

export const CustodialWalletAttentionModal = NiceModal.create(() => {
  const currentModal = NiceModal.useModal();

  const handleConnect = () => {
    currentModal.resolve();
    currentModal.remove();
  };

  const ref = React.useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => {
    currentModal.reject();
    currentModal.remove();
  });

  return (
    <div className="px-4 overflow-hidden z-40 bg-black/50 fixed inset-0 backdrop-blur-lg w-full h-full flex justify-center items-center">
      <div
        ref={ref}
        className="max-w-[450px] text-center flex gap-[26px] flex-col"
      >
        <Typography variant="poppins" order={2} weight="regular">
          Please use only non-custodial wallets
          <br />
          <span className="text-text-accent-yellow">
            (e.g., Trust Wallet, Metamask, Binance Web3 Wallet).
          </span>
          <br />
          Custodial wallets, such as Binance, Bybit, or Coinbase, are not
          supported. Using them may result in the loss of your funds.
        </Typography>
        <Button className="w-full" onClick={handleConnect}>
          Connect Wallet
        </Button>
      </div>
    </div>
  );
});
