const VAULT_PRIMARY_BADGE = ['soon'];

export const sortVaultBadges = (badges?: string[]): string[] => {
  if (!badges) return [];

  return badges.sort((badgeA, badgeB) => {
    if (VAULT_PRIMARY_BADGE.includes(badgeA)) {
      return 1;
    }

    if (VAULT_PRIMARY_BADGE.includes(badgeB)) {
      return -1;
    }

    return 0;
  });
};
