import React from 'react';

import { Card } from '@heroui/react';
import { Tab, Tabs } from '@heroui/tabs';

import { ConnectWallet } from '@/features/ConnectWallet';
import { RampTokenForm } from '@/features/RampTokenForm';
import { useSelectRampCurrencyModal } from '@/features/SelectRampCurrency';
import { useSelectTokenModal } from '@/features/SelectToken';
import { SwapTokenForm } from '@/features/SwapToken';
import ArrowTransfer from '@/shared/assets/icons/arrow-transfer.svg';

export const ExchangeSwap = () => {
  const { openModal } = useSelectTokenModal();
  const { openModalSelectRampCurrency } = useSelectRampCurrencyModal();

  const items = [
    {
      key: 'swap',
      content: (
        <SwapTokenForm
          features={{
            connectWallet: <ConnectWallet />,
            selectToken: openModal,
          }}
        />
      ),
      from: 'Crypto',
      to: 'Crypto',
      disabled: false,
    },
    // {
    //   key: 'exchange',
    //   content: (
    //     <RampTokenForm
    //       features={{
    //         connectWallet: <ConnectWallet />,
    //         selectCurrency: openModalSelectRampCurrency,
    //       }}
    //     />
    //   ),
    //   from: 'Fiat',
    //   to: 'Crypto',
    //   disabled: false,
    // },
  ];

  const disabledKeys = items
    .filter(({ disabled }) => disabled)
    .map(({ key }) => key);

  return (
    <Card className="bg-transparent lg:bg-background-modal p-6 mt-5 lg:mt-0 max-w-[375px] mx-auto lg:mx-0 lg:w-[375px] lg:min-w-[375px] h-fit">
      <Tabs
        aria-label="exchange-tabs"
        classNames={{
          tabList: 'p-1 w-full bg-button-secondary-defaultBg h-[61px]',
          tab: 'h-full',
          cursor: 'dark:bg-background-card',
        }}
        items={items}
        defaultSelectedKey="swap"
        disabledKeys={disabledKeys}
      >
        {(item) => (
          <Tab
            className="px-0"
            key={item.key}
            title={
              <div className="flex flex-col gap-0.5 items-center">
                <span className="text-sm font-extrabold uppercase font-unbounded">
                  {item.key}
                </span>
                <span className="inline-flex items-center gap-0.5 text-xs">
                  {item.from} <ArrowTransfer className="text-white" /> {item.to}
                </span>
              </div>
            }
          >
            {item.content}
          </Tab>
        )}
      </Tabs>
    </Card>
  );
};
