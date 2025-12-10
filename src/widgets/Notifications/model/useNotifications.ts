import * as lodash from 'lodash';

import { QueryKey } from '@/shared/lib';
import { useGetNotificationsByAddressApiV1NotificationAddressGet } from '@/shared/types';

import { UseNotificationsProps } from './types';

export const useNotifications = ({ address }: UseNotificationsProps) => {
  const { data } = useGetNotificationsByAddressApiV1NotificationAddressGet(
    address,
    {
      query: {
        queryKey: [QueryKey.Notifications, address],
      },
    },
  );

  const notificationGroups = lodash.groupBy(data?.data.data ?? [], 'is_seen');
  const newNotifications = notificationGroups['false'] ?? [];
  const seenNotifications = notificationGroups['true'] ?? [];

  const hasNewNotifications = newNotifications.length > 0;
  const hasSeenNotifications = seenNotifications.length > 0;

  const hasNotifications = hasNewNotifications || hasSeenNotifications;

  return {
    newNotifications,
    seenNotifications,
    hasNewNotifications,
    hasSeenNotifications,
    hasNotifications,
  };
};
