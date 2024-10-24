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
    title: 'Today',
  },
  {
    key: PeriodTab.Week,
    title: 'Week',
  },
  {
    key: PeriodTab.Month,
    title: 'Month',
  },
  {
    key: PeriodTab.Year,
    title: 'Year',
  },
  {
    key: PeriodTab.All,
    title: 'All',
  },
];
