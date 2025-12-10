'use client';

import React from 'react';

import clsx from 'clsx';

import {
  HowTrustScoreCountsButton,
  HowTrustScoreCountsButtonViewType,
} from '@/entities/HowTrustScoreCounts';
import { TrustScoreBanner } from '@/entities/TrustScoreBanner';
import { QueryKey } from '@/shared/lib';
import {
  AuditorResponseData,
  ComponentWithProps,
  Nullable,
  useGetFundHistoryTrustScoreApiV1VaultsVaultIdHistoryTrustScoreGet,
} from '@/shared/types';
import {
  SafetyScoreDetailsSkeleton,
  Text,
  TextView,
  Title,
  TrustScoreDescription,
} from '@/shared/ui';

import ArrowIcon from '../assets/icons/arrow.svg';

import styles from './SafetyScoreDetails.module.scss';

type SafetyScoreDetailsProps = {
  auditor: Nullable<AuditorResponseData>;
  trustScore: Nullable<number>;
  vaultId: Nullable<number>;
  isLoading?: boolean;
};

export const SafetyScoreDetails: ComponentWithProps<
  SafetyScoreDetailsProps
> = ({ auditor, trustScore, vaultId, isLoading = false, className }) => {
  const [isOpened, setIsOpened] = React.useState(true);
  const { data, isLoading: isDataLoading } =
    useGetFundHistoryTrustScoreApiV1VaultsVaultIdHistoryTrustScoreGet(
      vaultId as number,
      {
        query: { queryKey: [QueryKey.TrustScoreDetails, vaultId] },
      },
    );

  const trustScoreDetails = data?.data?.data;

  if (isLoading || isDataLoading || !trustScoreDetails) {
    return <SafetyScoreDetailsSkeleton />;
  }

  const firstSection = trustScoreDetails.slice(0, 5);
  const secondSection = trustScoreDetails.slice(5, 9);
  const thirdSection = trustScoreDetails.slice(10, 12);

  return (
    <section
      className={clsx(styles.root, isOpened && styles.opened, className)}
    >
      <Title order={4}>Safety Score Details</Title>
      <div className={styles.container}>
        <TrustScoreBanner
          trustScoreValue={trustScore ?? 0}
          className={styles.trustScoreBanner}
          auditor={auditor}
        />
        <div className={styles.trustScoreBreakdown}>
          {!!firstSection.length && (
            <div className={styles.breakdownSection}>
              <Text
                className={styles.breakdownSectionTitle}
                textView={TextView.H4}
              >
                Protocol
                <div className={styles.line} />
              </Text>
              {firstSection.map((detail, index) => (
                <TrustScoreDescription
                  className={styles.trustDescription}
                  details={detail}
                  key={index}
                />
              ))}
            </div>
          )}
          {!!secondSection.length && (
            <div className={styles.breakdownSection}>
              <Text
                className={styles.breakdownSectionTitle}
                textView={TextView.H4}
              >
                Pool
                <div className={styles.line} />
              </Text>
              {secondSection.map((detail, index) => (
                <TrustScoreDescription
                  className={styles.trustDescription}
                  details={detail}
                  key={index}
                />
              ))}
            </div>
          )}
          {!!thirdSection.length && (
            <div className={styles.breakdownSection}>
              <Text
                className={styles.breakdownSectionTitle}
                textView={TextView.H4}
              >
                Asset
                <div className={styles.line} />
              </Text>
              {thirdSection.map((detail, index) => (
                <TrustScoreDescription
                  className={styles.trustDescription}
                  details={detail}
                  key={index}
                />
              ))}
            </div>
          )}
        </div>
        <HowTrustScoreCountsButton
          className={clsx(styles.tooltip, styles.tooltipMobile)}
          viewType={HowTrustScoreCountsButtonViewType.Button}
          hasIcon
        />
        <button
          className={styles.dropdownButton}
          onClick={() => setIsOpened((prev) => !prev)}
        >
          <ArrowIcon />
        </button>
      </div>
    </section>
  );
};
