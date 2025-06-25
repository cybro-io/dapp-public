import type { DefaultError } from '@tanstack/query-core';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QueryKey } from '@/shared/lib';

import { claimLockedToken } from './claim-locked-token';

export const useClaimLockedToken = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: claimLockedTokenMutation, isPending } = useMutation<
    void,
    DefaultError,
    string
  >({
    mutationFn: (lockedTokenAddress) =>
      claimLockedToken({ lockedTokenAddress }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.CybroBalance],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKey.ClaimedCybroBalance],
      });
    },
  });

  return { claimLockedTokenMutation, isPending };
};
