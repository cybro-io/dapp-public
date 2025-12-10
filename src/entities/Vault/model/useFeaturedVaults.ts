import { useGetFeaturedFundsApiV1VaultsFeaturedGet } from '@/shared/types';

export const useFeaturedVaults = () => {
  const { data: vaults, isLoading } = useGetFeaturedFundsApiV1VaultsFeaturedGet(
    { offset: 0, limit: 3 },
    {
      query: {
        select: (data) => data.data.data,
      },
    },
  );

  const vaultSkeletons = Array.from({ length: 3 }).fill('');

  return { vaults, isLoading, vaultSkeletons };
};
