export enum PeriodTab {
  Today = 'today',
  Week = 'week',
  Month = 'month',
  Year = 'year',
  All = 'all',
}

export enum TxActionType {
  Deposit = 'deposit',
  Withdraw = 'withdraw',
  Group = 'group',
}

export const periodTabs = [
  {
    key: PeriodTab.Today,
    label: 'Today',
  },
  {
    key: PeriodTab.Week,
    label: 'Week',
  },
  {
    key: PeriodTab.Month,
    label: 'Month',
  },
  {
    key: PeriodTab.Year,
    label: 'Year',
  },
  {
    key: PeriodTab.All,
    label: 'All time',
  },
];

export const periodNames = periodTabs.reduce(
  (acc, value) => ({ ...acc, [value.key]: value.label }),
  {},
) as Record<PeriodTab, string>;
