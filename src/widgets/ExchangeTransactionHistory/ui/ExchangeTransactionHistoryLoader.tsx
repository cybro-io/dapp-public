import React from 'react';

import { Skeleton } from '@heroui/react';

export const ExchangeTransactionHistoryLoader = () => (
  <React.Fragment>
    {new Array(3).fill('').map((_, index) => (
      <Skeleton
        key={index}
        classNames={{
          base: 'rounded-[14px] mb-[73px] dark:bg-background-tableRow',
          content: 'w-full h-[73px]',
        }}
      ></Skeleton>
    ))}
  </React.Fragment>
);
