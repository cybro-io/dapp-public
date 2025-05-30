import { RateTab } from './types';

export const rateNames: Record<RateTab, string> = {
  [RateTab.apy]: 'APY',
  [RateTab.tvl]: 'TVL',
  [RateTab.distribution]: 'Distribution',
};

export const rateUnits: Record<RateTab, string> = {
  [RateTab.tvl]: '$',
  [RateTab.apy]: '%',
  [RateTab.distribution]: '%',
};

export const chartsRates = Object.entries(rateNames).map(([key, value]) => ({
  key: key as RateTab,
  title: value,
}));

export const timeFramesRates = chartsRates
  .filter(({ key }) => ![RateTab.distribution].includes(key))
  .map(({ key }) => key);
