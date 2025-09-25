import { useMemo } from 'react';

import { useFlag } from '@unleash/proxy-client-react';

import { Flag, isIndexVault, isSeasonalVault } from '@/shared/lib';
import { Nullable } from '@/shared/types';

import { RateTab } from './types';

export const rateNames: Record<RateTab, string> = {
  [RateTab.apy]: 'APY',
  [RateTab.tvl]: 'TVL',
  [RateTab.distribution]: 'Distribution',
  [RateTab.hodl]: 'Fund vs BTC HODL',
};

export const rateUnits: Record<RateTab, string> = {
  [RateTab.tvl]: '$',
  [RateTab.apy]: '%',
  [RateTab.distribution]: '%',
  [RateTab.hodl]: '$',
};

export const chartsRates = Object.entries(rateNames).map(([key, value]) => ({
  key: key as RateTab,
  title: value,
}));

export const timeFramesRates = chartsRates
  .filter(({ key }) => ![RateTab.distribution, RateTab.hodl].includes(key))
  .map(({ key }) => key);

export const useChartRates = (tags: Nullable<Nullable<string[]>>) => {
  const visibleHODLChart = useFlag(Flag.btcHODLChart);

  const visibleCharts = useMemo(() => {
    if (isSeasonalVault(tags) && visibleHODLChart) {
      return chartsRates;
    }

    if (isIndexVault(tags)) {
      return chartsRates.filter((rate) => rate.key !== RateTab.hodl);
    }

    return chartsRates.filter(
      (rate) => rate.key !== RateTab.hodl && rate.key !== RateTab.distribution,
    );
  }, [tags, visibleHODLChart]);

  return { visibleCharts };
};
