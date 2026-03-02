import React from 'react';

import NiceModal from '@ebay/nice-modal-react';
import { isIOS } from '@react-aria/utils';
import clsx from 'clsx';

import { AnalyticsEvent, track } from '@/shared/analytics';
import { isDeviceStandalone, useInstallPwa, useToast } from '@/shared/lib';
import {
  Button,
  ButtonSize,
  Group,
  Stack,
  Title,
  ToastType,
  Typography,
} from '@/shared/ui';

import { HowToInstallPWAModal } from './HowToInstallPWAModal';
import styles from './Hub.module.scss';

export const HubPWA = () => {
  const { triggerToast } = useToast();
  const { installPWA, promptEvent } = useInstallPwa();
  const howToInstallModal = NiceModal.useModal(HowToInstallPWAModal);

  const handleInstall = () => {
    track.event(AnalyticsEvent.PWAInstall);

    if (!isIOS()) {
      installPWA().catch(() => {
        triggerToast({
          message: 'Error',
          description: 'Failed to install application',
          type: ToastType.Error,
        });
      });
      return;
    }

    howToInstallModal.show().then();
  };

  if (isDeviceStandalone() || (!promptEvent && !isIOS())) {
    return null;
  }

  return (
    <Group className="px-6 lg:px-[50px] w-full justify-center">
      <Stack
        className={clsx(
          styles.pwaRoot,
          'lg:flex-row gap-3 relative w-full max-w-[327px] lg:max-w-[1151px] rounded-[30px] py-[19px] lg:py-[30px] pl-[19px] lg:pl-[30px] pr-[19px] lg:pr-[50px] justify-between items-start lg:items-center',
        )}
      >
        <Stack className="gap-3 lg:gap-2 max-w-[163px] lg:max-w-[560px]">
          <Title order={{ lg: 3, base: 4 }}>
            Discover CYBRO as a mobile app
          </Title>
          <Typography order={3} variant="poppins" className="text-white/80">
            Install CYBRO to your home screen for&nbsp;
            <text className="text-white">instant access</text>, offline mode,
            and&nbsp;
            <text className="text-white">push notifications</text>
            &nbsp; — just like a real app.
          </Typography>
        </Stack>

        <Button
          size={ButtonSize.Medium}
          className="!h-9 lg:!h-[53px]"
          onClick={handleInstall}
        >
          Install
        </Button>
      </Stack>
    </Group>
  );
};
