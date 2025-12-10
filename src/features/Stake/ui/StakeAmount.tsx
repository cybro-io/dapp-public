import React from 'react';

import { BigNumber } from 'bignumber.js';

import { useStakeContext } from '@/features/Stake';
import { AmountInput, Group } from '@/shared/ui';

export const StakeAmount = () => {
  const { form, balance } = useStakeContext();

  return (
    <Group className="w-full justify-center items-center p-4 border-1 border-stroke-tableBorder rounded-[20px]">
      <AmountInput
        placeholder="0"
        label="Entry Amount"
        showPercent={true}
        max={balance}
        onSelectPercent={(percent) => {
          form.setFieldValue(
            'amount',
            new BigNumber(balance)
              .multipliedBy(percent)
              .dp(percent === 1 ? 18 : 6)
              .toFixed(),
          );
        }}
        {...form.register('amount')}
      />
    </Group>
  );
};
