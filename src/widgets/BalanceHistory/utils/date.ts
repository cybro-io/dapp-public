import {
  endOfDay,
  format,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from 'date-fns';

import { PeriodTab } from '@/widgets/BalanceHistory';

export const formatChartDate = (
  dateString: string,
  period: PeriodTab,
): string => {
  const date = new Date(dateString);

  switch (period) {
    case PeriodTab.Today:
      // Format: 24.05.24 14:22
      return format(date, 'HH:mm');

    case PeriodTab.Week:
      // Format: Thu, 24 May (e.g., with day name and day-month)
      return format(date, 'dd MMM');

    case PeriodTab.Month:
      // Format: 24 May 14:22
      return format(date, 'dd MMM');

    case PeriodTab.Year:
      // Format: May 2024 (Month-Year)
      return format(date, 'MMM yyyy');

    case PeriodTab.All:
      // Format: Jan '23 (Month 'YY)
      return format(date, 'MMM yyyy');

    default:
      // Default to full date time format if none matched
      return format(date, 'dd.MM.yy HH:mm');
  }
};

export const getPeriodRange = (
  period: PeriodTab,
): { since: number; to: number } => {
  const now = new Date();
  let since: Date;
  const to: Date = endOfDay(now);

  switch (period) {
    case PeriodTab.Today:
      since = startOfDay(now);
      break;
    case PeriodTab.Week:
      since = startOfWeek(now);
      break;
    case PeriodTab.Month:
      since = startOfMonth(now);
      break;
    case PeriodTab.Year:
      since = startOfYear(now);
      break;
    case PeriodTab.All:
      since = new Date(0);
      break;
    default:
      throw new Error('Invalid period tab');
  }

  return {
    since: Math.floor(since.getTime() / 1000),
    to: Math.floor(to.getTime() / 1000),
  };
};
