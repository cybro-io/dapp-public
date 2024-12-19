import { GetDashboardStatsApiV1DashboardAddressStatsGetTimeframe } from '@/shared/types';

export const dropdownData = [
  {
    key: GetDashboardStatsApiV1DashboardAddressStatsGetTimeframe.Today,
    title: 'Today',
  },
  {
    key: GetDashboardStatsApiV1DashboardAddressStatsGetTimeframe.Week,
    title: 'Week',
  },
  {
    key: GetDashboardStatsApiV1DashboardAddressStatsGetTimeframe.Month,
    title: 'Month',
  },
  {
    key: GetDashboardStatsApiV1DashboardAddressStatsGetTimeframe.Year,
    title: 'Year',
  },
  {
    key: GetDashboardStatsApiV1DashboardAddressStatsGetTimeframe.All,
    title: 'All',
  },
];

export enum ApyPeriodType {
  Percent = 'percent',
  Fiat = 'fiat',
}
