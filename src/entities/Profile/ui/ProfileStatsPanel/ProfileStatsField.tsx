import React from 'react';

import { Skeleton } from '@heroui/react';

import { Stack, Typography } from '@/shared/ui';

interface ProfileStatsFieldProps extends React.PropsWithChildren {
  label: React.ReactNode;
  isLoading?: boolean;
}

export const ProfileStatsField = ({
  label,
  children,
  isLoading,
}: ProfileStatsFieldProps) => {
  return (
    <Stack className="gap-px">
      <Typography
        variant="caption"
        order={4}
        className="text-white/70 inline-flex items-center gap-1.5"
        weight="semi-bold"
      >
        {label}
      </Typography>
      <Skeleton isLoaded={!isLoading}>
        <Typography
          variant="poppins"
          order={2}
          className="inline-flex items-center gap-1.5"
        >
          {children}
        </Typography>
      </Skeleton>
    </Stack>
  );
};
