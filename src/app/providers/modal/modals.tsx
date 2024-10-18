import React from 'react';

import { HowTrustScoreCountsModal } from '@/entities/HowTrustScoreCounts';
import { SupportRequestModal } from '@/widgets/SupportRequest';
import { YieldCalculatorModal } from '@/widgets/YieldCalculator';

export enum ModalId {
  HowTrustScoreCounts,
  YieldCalculator,
  SupportRequest,
}

export const ModalIdToView: Record<ModalId, React.ReactElement> = {
  [ModalId.HowTrustScoreCounts]: <HowTrustScoreCountsModal />,
  [ModalId.YieldCalculator]: <YieldCalculatorModal />,
  [ModalId.SupportRequest]: <SupportRequestModal />,
};
