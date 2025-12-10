import React from 'react';

import { Button, Tooltip, useDisclosure } from '@heroui/react';
import Image from 'next/image';
import { useCopyToClipboard } from 'usehooks-ts';

import {
  truncateMiddle,
  useAppKitAccount,
  useAppKitDisconnect,
} from '@/shared/lib';
import { Group, Stack, Typography } from '@/shared/ui';
import CopyIcon from '@assets/icons/copy.svg';
import ExitIcon from '@assets/icons/exit.svg';
import ProfileImage from '@assets/icons/profile.png';

export const ProfileStatsHeader = () => {
  const { disconnect } = useAppKitDisconnect();
  const { address } = useAppKitAccount();

  const [_copiedText, handleToCopy] = useCopyToClipboard();
  const tooltipHandlers = useDisclosure();

  return (
    <Stack className="px-[30px] flex-nowrap gap-4">
      <Group className="justify-between items-center">
        <Typography variant="caption" order={3} className="text-white/50">
          Your Cybro Profile
        </Typography>

        <Typography
          component="button"
          variant="caption"
          order={3}
          className="text-white/50 inline-flex gap-1.5 items-center"
          onClick={disconnect}
        >
          Log out
          <ExitIcon />
        </Typography>
      </Group>

      <Group className="items-center gap-3">
        <Image
          src={ProfileImage}
          alt="profile"
          className="flex-shrink-0 size-[30px] rounded-full"
        />

        <Group className="gap-3 items-center">
          <Typography order={3} uppercase className="!text-[18px]">
            {truncateMiddle(address ?? '', 3)}
          </Typography>
          <Tooltip
            content="Copied!"
            isOpen={tooltipHandlers.isOpen}
            onClose={tooltipHandlers.onClose}
          >
            <Button
              size="sm"
              variant="light"
              isIconOnly
              onPress={() =>
                handleToCopy(address ?? '').then(() => tooltipHandlers.onOpen())
              }
            >
              <CopyIcon />
            </Button>
          </Tooltip>
        </Group>
      </Group>
    </Stack>
  );
};
