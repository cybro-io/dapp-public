import React from 'react';

import clsx from 'clsx';

import {
  HowTrustScoreCountsButton,
  HowTrustScoreCountsButtonViewType,
} from '@/entities/HowTrustScoreCounts';
import { AuditorResponseData, ComponentWithProps } from '@/shared/types';
import { Text, TextView, TrustScore } from '@/shared/ui';

import ShieldIcon from '../assets/icons/shield.svg';

import styles from './TrustScoreBannerV2.module.scss';

type TrustScoreBannerProps = {
  auditor: AuditorResponseData;
  trustScoreValue: number;
  isBordered?: boolean;
};

export const TrustScoreBannerV2: ComponentWithProps<TrustScoreBannerProps> = ({
  auditor,
  trustScoreValue,
  isBordered = true,
  className,
}) => {
  return (
    <div
      className={clsx(
        styles.root,
        !isBordered && styles.notBordered,
        className,
      )}
    >
      <div className={styles.trustScoreLeft}>
        <TrustScore
          value={trustScoreValue}
          className={clsx(styles.trustScore, styles.trustScoreMobile)}
        />
        <TrustScore
          value={trustScoreValue}
          className={clsx(styles.trustScore, styles.trustScoreDesktop)}
          isBordered={false}
        />
        <HowTrustScoreCountsButton
          className={clsx(styles.tooltip)}
          viewType={HowTrustScoreCountsButtonViewType.Tooltip}
        />
      </div>
      <div className={styles.trustScoreRight}>
        <Text className={styles.vaultDescription} textView={TextView.P3}>
          This vault is rated with a moderate risk score due to its exposure to
          high-volatility assets. Safety measures include investments and
          real-time risk management.
        </Text>
        <div className={styles.inspectedContainer}>
          <Text textView={TextView.C1} className={styles.auditedBy}>
            <ShieldIcon />
            Audited by
          </Text>
          <Text textView={TextView.P2} className={styles.auditor}>
            {/*{auditor.icon && <Image src={auditor.icon} alt={''} />}*/}
            {auditor.name}
          </Text>
        </div>
      </div>
    </div>
  );
};
