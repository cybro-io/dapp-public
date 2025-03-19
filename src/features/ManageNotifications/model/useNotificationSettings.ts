import * as lodash from 'lodash';

import { QueryKey } from '@/shared/const';
import { useWeb3ModalAccount } from '@/shared/lib';
import { useGetNotificationSettingsApiV1NotificationAddressSettingsGet } from '@/shared/types';

import { GroupNotification } from './types';

export const useNotificationSettings = () => {
  const { address } = useWeb3ModalAccount();

  const { data, isLoading: isLoadingCategories } =
    useGetNotificationSettingsApiV1NotificationAddressSettingsGet(address!, {
      query: {
        enabled: Boolean(address),
        queryKey: [QueryKey.NotificationSettings],
      },
    });

  const groups = (data?.data.data ?? []) as GroupNotification[];
  const categories = lodash.groupBy(groups, 'category_name');

  return { categories, isLoadingCategories };
};
