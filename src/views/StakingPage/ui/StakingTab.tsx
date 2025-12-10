import React from 'react';

import { Tab, Tabs } from '@heroui/tabs';
import clsx from 'clsx';

import titleClassNames from '@/shared/ui/baseComponents/Title/Title.module.scss';
import { StakingCybro } from '@/widgets/StakingCybro';
import { StakingLockedCybro } from '@/widgets/StakingLockedCybro';

const stakingTabs = [
  { key: 'cybro', title: 'Cybro', component: <StakingCybro /> },
  { key: 'lcybro', title: 'Locked Cybro', component: <StakingLockedCybro /> },
];

export const StakingTab = () => {
  const [tab, setTab] = React.useState<string | number>('cybro');
  return (
    <Tabs
      items={stakingTabs}
      selectedKey={tab}
      onSelectionChange={setTab}
      classNames={{
        tabList: 'bg-transparent gap-3',
        cursor: 'dark:bg-white rounded-none',
        tabContent: clsx(
          titleClassNames.titleH4,
          titleClassNames.title,
          'uppercase group-data-[selected=true]:text-button-primary-defaultLabel text-white',
        ),
        panel: 'p-0 pt-10 lg:pt-[46px]',
      }}
    >
      {(item) => (
        <Tab key={item.key} title={item.title}>
          {item.component}
        </Tab>
      )}
    </Tabs>
  );
};
