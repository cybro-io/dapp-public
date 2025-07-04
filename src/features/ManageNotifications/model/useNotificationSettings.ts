import * as lodash from 'lodash';

import { QueryKey } from '@/shared/lib';
import { useAppKitAccount } from '@/shared/lib';
import { useGetNotificationSettingsApiV1NotificationAddressSettingsGet } from '@/shared/types';

import { GroupNotification } from './types';

export const useNotificationSettings = () => {
  const { address } = useAppKitAccount();

  const { data, isLoading: isLoadingCategories } =
    useGetNotificationSettingsApiV1NotificationAddressSettingsGet(address!, {
      query: {
        enabled: Boolean(address),
        queryKey: [QueryKey.NotificationSettings, address],
        staleTime: 0,
      },
    });

  const groups = (data?.data.data ?? []) as GroupNotification[];
  const categories = lodash.groupBy(groups, 'category_name');

  return { categories, groups, isLoadingCategories };
};
