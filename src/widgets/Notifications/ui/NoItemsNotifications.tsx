import React from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@heroui/react';

import { ManageNotificationButton } from '@/features/ManageNotifications';
import { Group, NotificationButton, Stack, Typography } from '@/shared/ui';

import { NoItemsNotificationsProps } from './types';

export const NoItemsNotifications = ({
  onOpenChangeManage,
}: NoItemsNotificationsProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover placement="bottom-end" isOpen={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <div>
          <NotificationButton
            onPress={() => setIsOpen((prevState) => !prevState)}
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="bg-black pt-4 px-6 pb-6 border-none rounded-[26px]">
        <Stack className="gap-3">
          <Group className="justify-between items-center min-w-[327px] max-w-[327px]">
            <Typography order={2}>All Notifications</Typography>
            <ManageNotificationButton onClick={onOpenChangeManage} />
          </Group>
          <Typography order={3} variant="poppins" className="text-white/60">
            You have no new notifications
          </Typography>
        </Stack>
      </PopoverContent>
    </Popover>
  );
};
