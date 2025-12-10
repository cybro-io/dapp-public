import { Notification } from '@/shared/types';

export interface NotificationsProps {
  address: string;
}

export interface NotificationListProps {
  notifications: Array<Notification>;
  onReadNotification?: (id: number) => void;
}

export interface NoItemsNotificationsProps {
  onOpenChangeManage: () => void;
}
