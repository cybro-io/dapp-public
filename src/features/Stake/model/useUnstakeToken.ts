import type { DefaultError } from '@tanstack/query-core';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QueryKey } from '@/shared/const';

import { unstakeToken } from './unstake-token';

export const useUnstakeToken = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: unstakeTokenMutation, isPending } = useMutation<
    void,
    DefaultError,
    string
  >({
    mutationFn: (stakeAddress) => unstakeToken({ stakeAddress }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKey.AvailableRewards],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKey.StakedReport],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKey.CybroBalance],
      });
    },
  });

  return { unstakeTokenMutation, isPending };
};
