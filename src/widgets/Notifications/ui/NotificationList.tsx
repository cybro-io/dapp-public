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
        const fundId = notification.meta?.fund_id as
          | string
          | number
          | undefined;

        return (
          <NotificationPanel
            key={notification.id}
            color={notification.color as NotificationColor}
            time={dayjs(notification.created_ts).fromNow()}
            label={
              fundId && (
                <Link
                  href={`/explore/${fundId}`}
                  target="_blank"
                  onClick={() => onReadNotification?.(notification.id)}
                >
                  Explore
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
