import { useGetContractsApiV1StakingConfigGet } from '@/shared/types';

export const useStakingConfig = () => {
  const { data, isLoading: isLoadingConfig } =
    useGetContractsApiV1StakingConfigGet({
      query: {
        queryKey: ['stakingConfig'],
      },
    });

  return { config: data?.data.data, isLoadingConfig };
};
