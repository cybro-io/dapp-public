import { useAppKitAccount } from '@/shared/lib';
import { useGetRefStatsApiV1ProfileAddressRefcodeStatsGet } from '@/shared/types';

export const useReferralStats = () => {
  const { address } = useAppKitAccount();

  const { data: stats, isLoading } =
    useGetRefStatsApiV1ProfileAddressRefcodeStatsGet(address!, {
      query: {
        enabled: Boolean(address),
        queryKey: ['referralStats', address],
        select: (data) => data?.data.data,
        refetchInterval: 10_000,
      },
    });

  return { stats, isLoading };
};
