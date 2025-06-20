import type { DefaultError } from '@tanstack/query-core';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { claimReward } from '@/features/Stake/model/claim-reward';
import { QueryKey } from '@/shared/lib';

export const useClaimReward = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: claimRewardMutation, isPending } = useMutation<
    void,
    DefaultError,
    string
  >({
    mutationFn: (stakeAddress) => claimReward({ stakeAddress }),
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

  return { claimRewardMutation, isPending };
};
