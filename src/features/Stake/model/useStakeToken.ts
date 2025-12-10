import type { DefaultError } from '@tanstack/query-core';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QueryKey } from '@/shared/lib';

import { stakeToken, StakeTokenProps } from './stakeToken';

export const useStakeToken = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: stakeTokenMutation, isPending } = useMutation<
    void,
    DefaultError,
    StakeTokenProps
  >({
    mutationFn: stakeToken,
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [QueryKey.AvailableRewards],
        });
        queryClient.invalidateQueries({
          queryKey: [QueryKey.StakedReport],
        });
        queryClient.invalidateQueries({
          queryKey: [QueryKey.CybroBalance],
        });
      }, 1000);
    },
  });

  return { stakeTokenMutation, isPending };
};
