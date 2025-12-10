import React from 'react';

import { useBridgeContext } from '@/features/BridgeForm';
import ChevronDownIcon from '@/shared/assets/icons/chevron-down.svg';
import ChevronUpIcon from '@/shared/assets/icons/chevron-up.svg';
import { truncateMiddle } from '@/shared/lib';
import { AmountInput, AssetIcon, Group, Typography } from '@/shared/ui';

export const BridgeAddress = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const { form, address, destinationChain } = useBridgeContext();

  return isOpen || !address ? (
    <Group className="w-full justify-center items-center p-4 border-1 border-stroke-tableBorder rounded-[20px]">
      <AmountInput
        placeholder="Enter wallet address"
        label="Send to"
        isOnlyNumber={false}
        rightLabelSegment={
          <button onClick={() => setIsOpen(false)}>
            <ChevronUpIcon />
          </button>
        }
        {...form.register('address')}
      />
    </Group>
  ) : (
    <Group className="w-full justify-between items-center p-4 border-1 border-stroke-tableBorder rounded-[20px] mb-8">
      <Typography variant="caption" order={4} className="text-white/70">
        Send to
      </Typography>

      <Group className="gap-2.5">
        <Group className="gap-1 items-center">
          <AssetIcon
            width={20}
            height={20}
            alt={destinationChain?.name ?? ''}
            src={destinationChain?.logoUrl ?? ''}
          />
          <Typography variant="caption" order={3} uppercase>
            {truncateMiddle(form.values.address || address)}
          </Typography>
        </Group>

        <button onClick={() => setIsOpen(true)}>
          <ChevronDownIcon />
        </button>
      </Group>
    </Group>
  );
};
