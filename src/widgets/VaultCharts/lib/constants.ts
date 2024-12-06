import { RateTab } from './types';

export const rateNames: Record<RateTab, string> = {
  [RateTab.tvl]: 'TVL',
  [RateTab.sharePrice]: 'Share price',
  [RateTab.profit]: 'Profit',
  [RateTab.apy]: 'APY',
  [RateTab.distribution]: 'Distribution',
};

export const rateUnits: Record<RateTab, string> = {
  [RateTab.tvl]: '$',
  [RateTab.sharePrice]: '$',
  [RateTab.profit]: '$',
  [RateTab.apy]: '%',
  [RateTab.distribution]: '%',
};

export const rates = Object.entries(rateNames).map(([key, value]) => ({
  key: key as RateTab,
  title: value,
}));

export const chartsRates = rates.filter(({ key }) =>
  [RateTab.tvl, RateTab.apy, RateTab.distribution].includes(key),
);

export const timeFramesRates = rates
  .filter(({ key }) => ![RateTab.apy, RateTab.distribution].includes(key))
  .map(({ key }) => key);
