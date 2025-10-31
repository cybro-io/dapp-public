import React, { HTMLAttributes } from 'react';

import { sortVaultBadges } from '@/shared/lib';
import { Group, VaultBadge, VaultBadgeProps } from '@/shared/ui';

interface VaultBadgeListProps
  extends HTMLAttributes<HTMLDivElement>,
    Pick<VaultBadgeProps, 'isCompact' | 'withoutTooltip'> {
  badges?: string[] | null;
}

export const VaultBadgeList = ({
  badges,
  isCompact,
  withoutTooltip,
  ...props
}: VaultBadgeListProps) => {
  if (!badges) {
    return null;
  }

  return (
    <Group {...props}>
      {sortVaultBadges(badges).map((badge) => (
        <VaultBadge
          icon={badge as VaultBadgeProps['icon']}
          key={badge}
          withoutTooltip={withoutTooltip}
          isCompact={isCompact}
        />
      ))}
    </Group>
  );
};
