import { format } from 'date-fns';
import dayjs from 'dayjs';

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
  const now = dayjs().startOf('day');

  let since: number = 0;
  const to = now.endOf('day').unix();

  switch (period) {
    case PeriodTab.Today:
      since = now.unix();
      break;
    case PeriodTab.Week:
      since = now.add(-1, 'week').unix();
      break;
    case PeriodTab.Month:
      since = now.add(-1, 'month').unix();
      break;
    case PeriodTab.Year:
      since = now.add(-1, 'year').unix();
      break;
    case PeriodTab.All:
      since = 0;
      break;
    default:
      throw new Error('Invalid period tab');
  }

  return {
    since,
    to,
  };
};
