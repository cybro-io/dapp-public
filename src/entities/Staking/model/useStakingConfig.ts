import { useGetContractsApiV1StakingConfigGet } from '@/shared/types';

export const useStakingConfig = () => {
  const { data, isLoading: isLoadingConfig } =
    useGetContractsApiV1StakingConfigGet({
      query: {
        queryKey: ['stakingConfig'],
      },
    });

  const config = data?.data.data;

  return { config, isLoadingConfig };
};
