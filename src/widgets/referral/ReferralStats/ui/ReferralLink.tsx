import React from 'react';

import { Input } from '@heroui/input';
import { Skeleton, Tooltip, useDisclosure } from '@heroui/react';
import { CopyIcon } from '@heroui/shared-icons';
import clsx from 'clsx';
import QRCode from 'react-qr-code';
import { useCopyToClipboard } from 'usehooks-ts';

import { AnalyticsEvent, track } from '@/shared/analytics';
import { Button, ButtonSize, Group, Stack, Typography } from '@/shared/ui';

import { useGetReferralCode } from '../model/useGetReferralCode';

import styles from './ReferralLink.module.scss';

export const ReferralLink = () => {
  const { referralCode, isPending } = useGetReferralCode();

  const referralLink = `${window.origin}/invite/${referralCode}`;

  const [_copiedText, copyToClipboard] = useCopyToClipboard();
  const tooltipHandlers = useDisclosure();

  const handleCopy = () => {
    if (referralCode) {
      copyToClipboard(referralLink).then(() => {
        tooltipHandlers.onOpen();
        track.event(AnalyticsEvent.ReferralLinkCopy, { code: referralCode });
      });
    }
  };

  return (
    <Group
      className={clsx(
        'gap-x-7 gap-y-6 justify-center max-w-[588px] w-full bg-background-chips rounded-[10px] p-4 md:p-5 pr-6 md:pr-7',
        styles.card,
      )}
    >
      <Skeleton isLoaded={!isPending} className="rounded-[20px]">
        <Group className="rounded-[20px] bg-white p-3 h-auto w-full max-w-[165px]">
          <QRCode
            size={256}
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            value={referralLink}
            viewBox={`0 0 256 256`}
          />
        </Group>
      </Skeleton>

      <Stack className="justify-between gap-5">
        <Stack className="justify-center flex-1">
          <Typography order={{ base: 3, md: 1 }} className="max-w-[346px]">
            Invite friends and earn&nbsp;
            <text className="text-text-accent-logoYellow">
              all of CYBRO’s platform fees
            </text>
          </Typography>
        </Stack>

        <Skeleton isLoaded={!isPending} className="rounded-[15px]">
          <Input
            value={referralCode ?? ''}
            disableAnimation
            readOnly
            classNames={{
              mainWrapper: 'cursor-default',
              input: 'text-[12px] md:text-[13px] cursor-default',
              innerWrapper: 'cursor-default',
              inputWrapper:
                'cursor-default h-[48px] data-[hover=true]:bg-black group-data-[focus=true]:bg-black md:h-[59px] bg-black p-[6px_6px_6px_16px] md:p-[3px_3px_3px_20px] rounded-[15px]',
            }}
            endContent={
              <Tooltip
                content="Copied!"
                isOpen={tooltipHandlers.isOpen}
                onClose={tooltipHandlers.onClose}
              >
                <Button
                  size={{ base: ButtonSize.Small, md: ButtonSize.Medium }}
                  endIcon={<CopyIcon className="size-5" />}
                  onClick={handleCopy}
                >
                  COPY
                </Button>
              </Tooltip>
            }
          />
        </Skeleton>
      </Stack>
    </Group>
  );
};
