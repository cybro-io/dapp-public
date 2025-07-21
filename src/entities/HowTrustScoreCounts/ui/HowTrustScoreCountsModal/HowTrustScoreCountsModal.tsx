import React from 'react';

import { HowTrustScoreCountsInfo } from '@/entities/HowTrustScoreCounts';
import { ComponentWithProps } from '@/shared/types';
import { Button, ButtonView } from '@/shared/ui';
import { ModalLayout } from '@/shared/ui/modals/ModalLayout';

import { useModal } from '../../../../app/providers';

import styles from './HowTrustScoreCountsModal.module.scss';

type HowTrustScoreCountsModalProps = {};

export const HowTrustScoreCountsModal: ComponentWithProps<
  HowTrustScoreCountsModalProps
> = ({ className }) => {
  const { closeModal } = useModal();

  return (
    <ModalLayout title={'Trust Score Calculation'}>
      <HowTrustScoreCountsInfo className={styles.modal} />
      <Button
        onClick={closeModal}
        className={styles.button}
        view={ButtonView.Secondary}
      >
        Okay, got it
      </Button>
    </ModalLayout>
  );
};
