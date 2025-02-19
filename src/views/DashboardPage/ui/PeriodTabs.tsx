import React from 'react';

import { Tab, Tabs } from '@nextui-org/tabs';
import clsx from 'clsx';

import typographyStyles from '@/shared/ui/baseComponents/Typography/Typography.module.scss';
import { PeriodTab, periodTabs } from '@/widgets/BalanceHistory';
import styles from '@/widgets/BalanceHistory/ui/BalanceHistory.module.scss';

interface PeriodTabsProps {
  period: PeriodTab;
  onPeriodChange: (period: PeriodTab) => void;
}

export const PeriodTabs = ({ period, onPeriodChange }: PeriodTabsProps) => {
  return (
    <Tabs
      items={periodTabs}
      selectedKey={period}
      onSelectionChange={(key) => onPeriodChange(key as PeriodTab)}
      classNames={{
        tabList: 'bg-background-chips rounded-full gap-0',
        tabContent: [
          'text-white/60 group-data-[selected=true]:text-black',
          typographyStyles.textCaption4,
        ],
        tab: 'px-2.5',
      }}
    >
      {({ key, label }) => (
        <Tab
          className={clsx(styles.tab, key === period && styles.selected)}
          key={key}
          title={label}
        />
      )}
    </Tabs>
  );
};
