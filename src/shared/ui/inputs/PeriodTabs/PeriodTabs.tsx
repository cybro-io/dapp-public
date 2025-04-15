import React from 'react';

import { Tab, Tabs } from '@heroui/react';

import typographyStyles from '@/shared/ui/baseComponents/Typography/Typography.module.scss';

import styles from './PeriodsTabs.module.scss';

type Key = string | number;

interface PeriodTabsProps<T extends Key> {
  periods: Array<{ key: T; label: string }>;
  period: T;
  onPeriodChange: (period: T) => void;
}

export const PeriodTabs = <T extends Key>({
  periods,
  period,
  onPeriodChange,
}: PeriodTabsProps<T>) => {
  return (
    <Tabs
      items={periods}
      selectedKey={period}
      onSelectionChange={(key) => onPeriodChange(key as T)}
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
        <Tab className={styles.tab} key={key} title={label} />
      )}
    </Tabs>
  );
};
