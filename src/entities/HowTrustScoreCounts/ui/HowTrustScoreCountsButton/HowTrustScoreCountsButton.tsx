'use client';

import React from 'react';

import clsx from 'clsx';

import {
  HowTrustScoreCountsButtonViewType,
  HowTrustScoreCountsInfo,
  HowTrustScoreCountsInfoViewType,
} from '@/entities/HowTrustScoreCounts';
import { track, AnalyticsEvent } from '@/shared/analytics';
import InfoIcon from '@/shared/assets/icons/info.svg';
import { ComponentWithProps } from '@/shared/types';
import { Link, LinkView } from '@/shared/ui';

import { ModalId, useModal } from '../../../../app/providers';

import styles from './HowTrustScoreCountsButton.module.scss';

type HowTrustScoreCountsProps = {
  viewType?: HowTrustScoreCountsButtonViewType;
  hasIcon?: boolean;
};

export const HowTrustScoreCountsButton: ComponentWithProps<
  HowTrustScoreCountsProps
> = ({ viewType = LinkView.Button, hasIcon = true, className }) => {
  const { openModal } = useModal();

  const onTooltipChange = React.useCallback((isOpen: boolean) => {
    if (isOpen) {
      track.event(AnalyticsEvent.TrustScoreHintOpen);
    }
  }, []);

  const onTooltipClick = React.useCallback((event: Event) => {
    console.log('event', event);
    event.preventDefault();
    event.stopPropagation();
    openModal(ModalId.HowTrustScoreCounts);
  }, []);

  return (
    <div className={clsx(styles.root, className)}>
      {viewType === HowTrustScoreCountsButtonViewType.Tooltip && (
        <span className={styles.text}>How the Trust Score Is Calculated</span>
      )}
      <Link
        onClick={onTooltipClick}
        viewType={viewType as LinkView}
        className={clsx(styles.link)}
        tooltipClassName={styles.tooltip}
        tooltipContent={
          <HowTrustScoreCountsInfo
            viewType={HowTrustScoreCountsInfoViewType.Tooltip}
          />
        }
        onTooltipChange={onTooltipChange}
      >
        {viewType === HowTrustScoreCountsButtonViewType.Button && (
          <span className={styles.text}>How the Trust Score Is Calculated</span>
        )}
        {viewType === HowTrustScoreCountsButtonViewType.Button && hasIcon && (
          <div>
            <InfoIcon />
          </div>
        )}
      </Link>
    </div>
  );
};
