import React from 'react';

import {
  StakedCard,
  useStakedReport,
  useStakingConfig,
} from '@/entities/Staking';
import { Stack } from '@/shared/ui';
import LockedCybroIcon from '@assets/assets/locked-cybro.svg';

export const StakedReports = () => {
  const { config } = useStakingConfig();
  const { report, isLoadingReport } = useStakedReport({
    stakingData: config?.staking,
  });

  if (isLoadingReport) {
    return null;
  }

  return (
    <Stack className="gap-2">
      {report.map((report) => (
        <StakedCard
          key={report.address}
          tokenName="Locked CYBRO"
          icon={<LockedCybroIcon />}
          {...report}
        />
      ))}
    </Stack>
  );
};
