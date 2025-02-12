import React from 'react';

import {
  StakedCard,
  useStakedReport,
  useStakingConfig,
} from '@/entities/Staking';
import { Stack } from '@/shared/ui';
import CybroIcon from '@assets/assets/cybro.svg';

export const StakedReports = () => {
  const { config } = useStakingConfig();
  const { report, isLoadingReport } = useStakedReport({
    stakingData: config?.staking_cybro,
  });

  if (isLoadingReport) {
    return null;
  }

  return (
    <Stack className="gap-2">
      {report.map((report) => (
        <StakedCard
          key={report.address}
          tokenName="CYBRO"
          icon={<CybroIcon />}
          {...report}
        />
      ))}
    </Stack>
  );
};
