import React from 'react';

import { HowTrustScoreCountsModal } from '@/entities/HowTrustScoreCounts';
import { SupportRequestModal } from '@/widgets/SupportRequest';

export enum ModalId {
  HowTrustScoreCounts,
  SupportRequest,
}

export const ModalIdToView: Record<ModalId, React.ReactElement> = {
  [ModalId.HowTrustScoreCounts]: <HowTrustScoreCountsModal />,
  [ModalId.SupportRequest]: <SupportRequestModal />,
};
