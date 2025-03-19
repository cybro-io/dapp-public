'use client';

import React from 'react';

import { Accordion, AccordionItem, Skeleton } from '@nextui-org/react';
import clsx from 'clsx';

import {
  HowTrustScoreCountsButton,
  HowTrustScoreCountsButtonViewType,
} from '@/entities/HowTrustScoreCounts';
import { TrustScoreBannerV2 } from '@/entities/TrustScoreBanner';
import { QueryKey } from '@/shared/const/queryKey';
import {
  AuditorResponseData,
  ComponentWithProps,
  Nullable,
  useGetFundHistoryTrustScoreApiV1VaultsVaultIdHistoryTrustScoreGet,
} from '@/shared/types';
import { Text, TextView, TrustScoreDescription } from '@/shared/ui';

import styles from './SafetyScoreDetailsV2.module.scss';

type SafetyScoreDetailsProps = {
  auditor: Nullable<AuditorResponseData>;
  trustScore: Nullable<number>;
  vaultId: Nullable<number>;
  isLoading?: boolean;
};

export const SafetyScoreDetailsV2: ComponentWithProps<
  SafetyScoreDetailsProps
> = ({ auditor, trustScore, vaultId, isLoading = false }) => {
  const { data, isLoading: isDataLoading } =
    useGetFundHistoryTrustScoreApiV1VaultsVaultIdHistoryTrustScoreGet(
      vaultId as number,
      {
        query: { queryKey: [QueryKey.TrustScoreDetails, vaultId] },
      },
    );

  const trustScoreDetails = data?.data?.data;

  if (isLoading || isDataLoading || !trustScoreDetails) {
    return (
      <Skeleton className="h-[84px] w-full dark:bg-background-chips/50 rounded-lg" />
    );
  }

  const firstSection = trustScoreDetails.slice(0, 5);
  const secondSection = trustScoreDetails.slice(5, 9);
  const thirdSection = trustScoreDetails.slice(10, 12);

  return (
    <Accordion
      id="trust-score-details"
      className="bg-background-chips/50 rounded-lg"
    >
      <AccordionItem
        key="trust-score"
        classNames={{ base: 'px-4 py-2' }}
        title={
          <div className={styles.container}>
            {typeof trustScore === 'number' && auditor && (
              <TrustScoreBannerV2
                trustScoreValue={trustScore}
                className={styles.trustScoreBanner}
                auditor={auditor}
              />
            )}
            <HowTrustScoreCountsButton
              className={clsx(styles.tooltip, styles.tooltipMobile)}
              viewType={HowTrustScoreCountsButtonViewType.Button}
              hasIcon
            />
          </div>
        }
      >
        <div className="bg-background-chips/50 rounded-lg p-4 flex flex-col gap-4">
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
      </AccordionItem>
    </Accordion>
  );
};
