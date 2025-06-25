import React from 'react';

import NiceModal from '@ebay/nice-modal-react';
import Image from 'next/image';

import { Group, Modal, Stack, Typography } from '@/shared/ui';

import HowInstallPWA1Image from '../lib/assets/how-install-pwa-1.png';
import HowInstallPWA2Image from '../lib/assets/how-install-pwa-2.png';

export const HowToInstallPWAModal = NiceModal.create(() => {
  const currentModal = NiceModal.useModal();

  return (
    <Modal
      onClose={currentModal.remove}
      isDismissable={false}
      classNames={{ base: 'px-6 pb-6' }}
    >
      <Modal.Header>How to install on your phone</Modal.Header>
      <Modal.Body className="bg-background-window rounded-[20px] p-4 flex flex-col gap-2">
        <YellowChip>For iPhone (Safari)</YellowChip>
        <Group className="bg-background-tableRow mt-1 py-2 px-1">
          <Typography variant="caption" order={4} className="text-white/60">
            Open <text className="text-white">cybro.io</text> in Safari
          </Typography>
        </Group>

        <Stack className="gap-2 py-2 px-1">
          <Typography variant="caption" order={4} className="text-white/60">
            Tap <text className="text-white">the share icon</text> (square with
            arrow)
          </Typography>
          <Image src={HowInstallPWA1Image} alt="How to install" />
        </Stack>

        <Stack className="bg-background-tableRow py-2 px-1 gap-2">
          <Typography variant="caption" order={4} className="text-white/60">
            Scroll down and tap&nbsp;
            <text className="text-white">“Add to Home Screen”</text>
          </Typography>
          <Image src={HowInstallPWA2Image} alt="How to install" />
        </Stack>

        <Typography
          variant="caption"
          order={4}
          className="text-white/60 px-1 py-2"
        >
          Tap <text className="text-white">“Add”</text> in the top right corner
        </Typography>
      </Modal.Body>
    </Modal>
  );
});

const YellowChip = ({ children }: React.PropsWithChildren) => {
  return (
    <Group className="bg-trustScore-yellow-100/30 px-2 py-1 w-fit rounded-[6px]">
      <Typography
        order={3}
        className="text-text-accent-logoYellow"
        weight="bold"
      >
        {children}
      </Typography>
    </Group>
  );
};
