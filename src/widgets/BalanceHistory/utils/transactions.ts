import { format } from 'date-fns';

import { DashboardHistoryData } from '@/shared/types';
import { PeriodTab, TxActionType } from '@/widgets/BalanceHistory';

export const groupTransactions = (
  data: DashboardHistoryData[],
  period: PeriodTab,
): DashboardHistoryData[] => {
  const groupedData = data.reduce(
    (acc, item) => {
      let dateKey = '';

      // Format date key based on the period
      switch (period) {
        case PeriodTab.Today:
          // Group by minutes
          dateKey = format(new Date(item.transaction_ts), 'yyyy-MM-dd HH:mm');
          break;
        case PeriodTab.Week:
        case PeriodTab.Month:
          // Group by days
          dateKey = format(new Date(item.transaction_ts), 'yyyy-MM-dd');
          break;
        case PeriodTab.Year:
        case PeriodTab.All:
          // Group by months
          dateKey = format(new Date(item.transaction_ts), 'yyyy-MM');
          break;
      }

      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }

      acc[dateKey].push(item);

      return acc;
    },
    {} as { [key: string]: DashboardHistoryData[] },
  );

  // Aggregate the grouped data
  return Object.values(groupedData).map((group) => {
    if (group.length === 1) {
      return group[0]; // If only one transaction, return it as is
    }

    const aggregatedTransaction: DashboardHistoryData = {
      action: TxActionType.Group,
      balance_usd: group[0].balance_usd,
      icon: '',
      token_in_name: '',
      share_count: group
        .reduce((sum, g) => {
          return g.action === TxActionType.Deposit
            ? sum + parseFloat(g.token_in_count)
            : sum - parseFloat(g.token_in_count);
        }, 0)
        .toString(),
      size_usd: group
        .reduce((sum, g) => {
          return g.action === TxActionType.Deposit
            ? sum + parseFloat(g.size_usd)
            : sum - parseFloat(g.size_usd);
        }, 0)
        .toString(),
      transaction_hash: '',
      transaction_ts: group[0].transaction_ts,
      fund_name: '',
      token_in_count: '',
      chain_id: group[0].chain_id,
    };

    return aggregatedTransaction;
  });
};
