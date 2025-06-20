import { useQueryClient } from '@tanstack/react-query';

import { QueryKey } from '@/shared/lib';
import { useSetSeenNotificationApiV1NotificationAddressNotificationIdPut } from '@/shared/types';

export const useReadNotification = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: readNotificationMutate, isPending } =
    useSetSeenNotificationApiV1NotificationAddressNotificationIdPut();

  const handleReadNotification = (address: string, notificationId: number) => {
    return readNotificationMutate({ address, notificationId }).finally(() => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.Notifications],
      });
    });
  };

  return { handleReadNotification, isPending };
};
