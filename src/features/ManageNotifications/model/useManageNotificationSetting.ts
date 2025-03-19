import { useQueryClient } from '@tanstack/react-query';

import { QueryKey } from '@/shared/const';
import { useWeb3ModalAccount } from '@/shared/lib';
import {
  useDisableNotificationsApiV1NotificationAddressDisableGroupIdPost,
  useEnableNotificationsApiV1NotificationAddressEnableGroupIdDelete,
} from '@/shared/types';

export const useManageNotificationSetting = () => {
  const { address } = useWeb3ModalAccount();
  const queryClient = useQueryClient();

  const { mutateAsync: enableMutate, isPending: isLoadingEnable } =
    useEnableNotificationsApiV1NotificationAddressEnableGroupIdDelete();
  const { mutateAsync: disableMutate, isPending: isLoadingDisable } =
    useDisableNotificationsApiV1NotificationAddressDisableGroupIdPost();

  const handleChangeSetting = (groupId: number, state: boolean) => {
    if (!address) {
      return;
    }

    const mutateFn = state ? enableMutate : disableMutate;

    mutateFn({ address, groupId }).then(() => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.NotificationSettings],
      });
    });
  };

  return {
    handleChangeSetting,
    isLoading: isLoadingEnable || isLoadingDisable,
  };
};
