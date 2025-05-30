import React from 'react';

import dayjs from 'dayjs';

import { NotificationPanel } from '@/entities/Notification';
import { NotificationColor } from '@/entities/Notification';
import { Link } from '@/shared/ui';

import { NotificationListProps } from './types';

export const NotificationList = ({
  notifications,
  onReadNotification,
}: NotificationListProps) => {
  return (
    <React.Fragment>
      {notifications.map((notification) => {
        const fundId =
          typeof notification.meta?.fundId === 'number'
            ? notification.meta?.fundId
            : null;

        return (
          <NotificationPanel
            key={notification.id}
            color={notification.color as NotificationColor}
            time={dayjs(notification.created_ts).fromNow()}
            label={
              fundId && (
                <Link href={`/explore/${fundId}`} target="_blank">
                  Go to vault
                </Link>
              )
            }
            isRead={notification.is_seen}
            onRead={() => onReadNotification?.(notification.id)}
          >
            {notification.content}
          </NotificationPanel>
        );
      })}
    </React.Fragment>
  );
};
