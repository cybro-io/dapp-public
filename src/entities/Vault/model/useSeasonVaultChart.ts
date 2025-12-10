import { QueryKey, seasonDescription } from '@/shared/lib';
import { useGetSeasonalFundInfoApiV1VaultsSeasonalFundIdGet } from '@/shared/types';

interface UseSeasonVaultChartProps {
  vaultId: number;
  isEnabled?: boolean;
}

export const useSeasonVaultChart = ({
  vaultId,
  isEnabled,
}: UseSeasonVaultChartProps) => {
  const { data, isLoading: isLoadingSeasonalVaultData } =
    useGetSeasonalFundInfoApiV1VaultsSeasonalFundIdGet(vaultId, {
      query: {
        queryKey: [QueryKey.SeasonalVaultChart, vaultId],
        enabled: isEnabled,
      },
    });

  const seasonalChartData = data?.data?.data?.chart_data ?? [];
  const season = (data?.data?.data?.season ?? null) as
    | keyof typeof seasonDescription
    | null;

  return { seasonalChartData, season, isLoadingSeasonalVaultData };
};
