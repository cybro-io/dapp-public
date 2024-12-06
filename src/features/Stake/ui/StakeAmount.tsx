import React from 'react';

import { useStakeContext } from '@/features/Stake';
import { AmountInput, Group } from '@/shared/ui';

export const StakeAmount = () => {
  const { form, lockedBalance } = useStakeContext();

  return (
    <Group className="justify-center items-center p-4 border-1 border-stroke-tableBorder rounded-[20px]">
      <AmountInput
        placeholder="0"
        label="Entry Amount"
        showPercent={true}
        max={lockedBalance}
        onSelectPercent={(percent) => {
          form.setFieldValue('amount', String(lockedBalance * percent));
        }}
        {...form.register('amount')}
      />
    </Group>
  );
};
