import React from 'react';

import { useStakedReport } from '@/entities/Staking';
import { Stack } from '@/shared/ui';

import { StakedCard } from './StakedCard';

export const StakedReports = () => {
  const { report, isLoadingReport } = useStakedReport();

  if (isLoadingReport) {
    return null;
  }

  return (
    <Stack className="gap-2">
      {report.map((report) => (
        <StakedCard key={report.address} {...report} />
      ))}
    </Stack>
  );
};
