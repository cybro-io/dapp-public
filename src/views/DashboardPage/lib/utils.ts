import { DashboardStatsVaultsData } from '@/shared/types';

export const convertVaultTokens = (vault: DashboardStatsVaultsData) => {
  const tokens = vault.tokens;

  if (!tokens || !tokens.length) {
    return [{ icon: vault.icon, name: vault.name }];
  }

  return tokens.map((token) => ({
    icon: token.icon ?? '',
    name: token.name,
  }));
};
