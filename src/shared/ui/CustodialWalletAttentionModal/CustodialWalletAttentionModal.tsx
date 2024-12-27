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
    <div className="px-4 overflow-hidden z-10 fixed inset-0 backdrop-blur-lg w-full h-full flex justify-center items-center">
      <div
        ref={ref}
        className="max-w-[450px] text-center flex gap-[26px] flex-col"
      >
        <Typography variant="poppins" order={2} weight="regular">
          Please ensure your wallet supports the{' '}
          <span className="text-text-accent-yellow">Blast network. </span>
          Custodial wallets (e.g., Binance, Coinbase) do not support Blast, and
          funds may be lost.
        </Typography>
        <Button className="w-full" onClick={handleConnect}>
          Connect Wallet
        </Button>
      </div>
    </div>
  );
});
