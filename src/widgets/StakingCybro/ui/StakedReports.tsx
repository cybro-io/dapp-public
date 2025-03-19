import React from 'react';

import { StakedCard, useStakedReport } from '@/entities/Staking';
import { useStakeContext } from '@/features/Stake';
import { Stack } from '@/shared/ui';
import CybroIcon from '@assets/assets/cybro.svg';

export const StakedReports = () => {
  const { stakingDataByChain, selectedChainId } = useStakeContext();
  const { report, isLoadingReport } = useStakedReport({
    stakingData: stakingDataByChain,
    chainId: selectedChainId,
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
          chainId={selectedChainId}
        />
      ))}
    </Stack>
  );
};
