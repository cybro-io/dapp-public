'use client';

import React, { Dispatch, SetStateAction } from 'react';

import { Switch } from '@nextui-org/switch';
import clsx from 'clsx';

import {
  ComponentWithProps,
  GetDashboardStatsApiV1DashboardAddressStatsGetTimeframe,
} from '@/shared/types';
import { InfoBox, InfoBoxActionType, InfoBoxViewType } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

import ApyIcon from '../assets/icons/apy.svg';
import { ApyPeriodType, dropdownData } from '../const';

import styles from './ApyInfo.module.scss';

type ApyInfoProps = {
  apy: string | null | undefined;
  apyFiat: string | null | undefined;
  period: GetDashboardStatsApiV1DashboardAddressStatsGetTimeframe;
  setPeriod: Dispatch<
    SetStateAction<GetDashboardStatsApiV1DashboardAddressStatsGetTimeframe>
  >;
  viewType?: InfoBoxViewType;
  isLoading?: boolean;
};

export const ApyInfo: ComponentWithProps<ApyInfoProps> = ({
  apyFiat,
  apy,
  period,
  setPeriod,
  viewType = InfoBoxViewType.Mobile,
  isLoading,
  className,
}) => {
  const [isOpened, setIsOpened] = React.useState(false);
  const [periodType, setPeriodType] = React.useState<ApyPeriodType>(
    ApyPeriodType.Fiat,
  );

  const getTitle = React.useCallback(() => {
    if (
      period !==
        GetDashboardStatsApiV1DashboardAddressStatsGetTimeframe.Today &&
      period !== GetDashboardStatsApiV1DashboardAddressStatsGetTimeframe.All
    ) {
      return `Last ${period}`;
    }

    return period;
  }, [period]);

  const onItemClick = React.useCallback(
    (period: GetDashboardStatsApiV1DashboardAddressStatsGetTimeframe) => {
      if (
        period === GetDashboardStatsApiV1DashboardAddressStatsGetTimeframe.All
      ) {
        setPeriodType(ApyPeriodType.Percent);
      }

      setPeriod(period);
      setIsOpened(false);
    },
    [setPeriod],
  );

  const onPeriodTypeChange = React.useCallback((isSelected: boolean) => {
    isSelected
      ? setPeriodType(ApyPeriodType.Fiat)
      : setPeriodType(ApyPeriodType.Percent);
  }, []);

  const getValue = React.useCallback(() => {
    const notAvailable = 'n/a';
    const apyPercent = apy ? `${Number(apy).toFixed(2)}%` : notAvailable;
    const apyFiatUsd = apyFiat ? `$${formatUserMoney(apyFiat)}` : notAvailable;

    if (
      period === GetDashboardStatsApiV1DashboardAddressStatsGetTimeframe.All
    ) {
      return apyPercent;
    }

    if (viewType === InfoBoxViewType.Desktop) {
      return apy && apyPercent ? `${apyPercent} • ${apyFiatUsd}` : notAvailable;
    }

    if (periodType === ApyPeriodType.Fiat) {
      return apyFiatUsd;
    }

    return apyPercent;
  }, [apy, apyFiat, period, periodType, viewType]);

  const dropdownItems = React.useMemo(
    () =>
      dropdownData.map(({ title, key }) => (
        <button
          className={clsx(styles.dropdownItem, period === key && styles.active)}
          key={key}
          onClick={() => onItemClick(key)}
        >
          {title}
        </button>
      )),
    [period, onItemClick],
  );

  return (
    <InfoBox
      icon={<ApyIcon />}
      title={'APY'}
      value={getValue()}
      isOpened={isOpened}
      setIsOpened={() => setIsOpened((prev) => !prev)}
      viewType={viewType}
      actionType={InfoBoxActionType.Select}
      className={className}
      dropdownButtonContent={getTitle()}
      dropdownItems={dropdownItems}
      isLoading={isLoading}
      rightContent={
        period !==
        GetDashboardStatsApiV1DashboardAddressStatsGetTimeframe.All ? (
          <Switch
            onValueChange={onPeriodTypeChange}
            classNames={{
              wrapper: clsx(styles.wrapper),
              thumb: clsx(styles.thumb),
            }}
            defaultSelected={periodType === ApyPeriodType.Fiat}
            startContent={<span className={styles.switchContent}>%</span>}
            endContent={<span className={styles.switchContent}>$</span>}
            thumbIcon={({ isSelected }) =>
              !isSelected ? (
                <span className={clsx(styles.switchContent, styles.selected)}>
                  %
                </span>
              ) : (
                <span className={clsx(styles.switchContent, styles.selected)}>
                  $
                </span>
              )
            }
          />
        ) : undefined
      }
    />
  );
};
