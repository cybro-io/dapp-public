import React from 'react';

import { useBridgeContext } from '@/features/BridgeForm';
import { AmountInput, Group } from '@/shared/ui';

export const BridgeAmount = () => {
  const { form } = useBridgeContext();

  return (
    <Group className="w-full justify-center items-center p-4 border-1 border-stroke-tableBorder rounded-[20px]">
      <AmountInput
        placeholder="0"
        label="Entry Amount"
        {...form.register('amount')}
      />
    </Group>
  );
};
