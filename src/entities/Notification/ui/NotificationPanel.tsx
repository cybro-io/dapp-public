'use client';

import React from 'react';

import { twMerge } from 'tailwind-merge';

import { Group, Stack, Typography } from '@/shared/ui';
import NotificationErrorRead from '@assets/icons/notification-error-read.svg';
import NotificationError from '@assets/icons/notification-error.svg';
import NotificationInfoIconRead from '@assets/icons/notification-info-read.svg';
import NotificationInfoIcon from '@assets/icons/notification-info.svg';
import NotificationSuccessRead from '@assets/icons/notification-success-read.svg';
import NotificationSuccess from '@assets/icons/notification-success.svg';
import NotificationWarningRead from '@assets/icons/notification-warning-read.svg';
import NotificationWarning from '@assets/icons/notification-warning.svg';

export type NotificationColor = 'success' | 'error' | 'warning' | 'info';

const notificationIcon: Record<NotificationColor, React.ReactElement> = {
  success: <NotificationSuccess />,
  error: <NotificationError />,
  warning: <NotificationWarning />,
  info: <NotificationInfoIcon />,
};

const notificationIconRead: Record<NotificationColor, React.ReactElement> = {
  success: <NotificationSuccessRead />,
  error: <NotificationErrorRead />,
  warning: <NotificationWarningRead />,
  info: <NotificationInfoIconRead />,
};

const notificationBg: Record<NotificationColor, string> = {
  success: 'bg-trustScore-green-100',
  error: 'bg-trustScore-red-100',
  warning: 'bg-text-accent-logoYellow',
  info: 'bg-text-accent-logoYellow',
};

interface INotificationPanelProps extends React.PropsWithChildren {
  label?: React.ReactNode | React.ReactNode[];
  time: React.ReactNode;
  color?: NotificationColor;
  isRead?: boolean;
  onRead?: () => void;
}

export const NotificationPanel = ({
  label,
  time,
  children,
  color = 'success',
  isRead = false,
  onRead,
}: INotificationPanelProps) => {
  const icon = isRead ? notificationIconRead[color] : notificationIcon[color];

  return (
    <Group
      drag={isRead ? false : 'x'}
      dragSnapToOrigin={true}
      onDragEnd={(_event, info) => {
        if (info.offset.x >= 200) {
          onRead?.();
        }
      }}
      dragConstraints={{ left: 0, right: 300 }}
      className="relative rounded-[14px] z-0 pl-1 pr-4 py-1 gap-3 bg-background-tableRow flex-nowrap overflow-hidden"
    >
      {!isRead && (
        <div
          className={twMerge(
            notificationBg[color],
            'z-[-1] absolute left-[-102px] bottom-[-90px] w-[172.23px] h-[172.23px] rounded-[493.01px] blur-[148.05px]',
          )}
        />
      )}
      <div className="min-w-[52px] w-[52px] h-auto bg-background-window rounded-[10px] flex justify-center items-center">
        {icon}
      </div>

      <Stack className="gap-3 py-2">
        <Group className="gap-6 inline-flex flex-nowrap">
          <Typography
            variant="poppins"
            order={3}
            className="flex-[2] whitespace-pre-wrap break-all"
          >
            {children}
          </Typography>
          <Typography variant="poppins" order={3} className="text-white/20">
            {time}
          </Typography>
        </Group>

        {/* Labels */}
        <Group className="gap-3">
          {Array.isArray(label) ? label.map((item) => item) : label}
        </Group>
      </Stack>
    </Group>
  );
};
