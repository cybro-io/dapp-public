import React from 'react';

import { Switch } from '@heroui/switch';

import { Chip, ChipSize, Group, Stack, Typography } from '@/shared/ui';

import { SettingFieldProps } from './types';

export const SettingField = ({
  icon,
  name,
  isSelected,
  isDisabled,
  onValueChange,
  description,
  isComing,
}: SettingFieldProps) => (
  <Group className="flex-nowrap justify-between items-center">
    <Group className="flex-nowrap gap-3">
      {icon}
      <Stack className="gap-1">
        <Typography variant="poppins" order={3} weight="bold">
          {name}
        </Typography>
        <Typography variant="poppins" order={3} className="text-white/60">
          {description}
        </Typography>
      </Stack>
    </Group>
    {isComing ? (
      <Chip size={ChipSize.Small} className="h-7 text-white/40 min-w-fit">
        Coming soon
      </Chip>
    ) : (
      <Switch
        isSelected={isSelected}
        onValueChange={onValueChange}
        isDisabled={isDisabled}
        classNames={{
          wrapper:
            'bg-background-tableRow group-data-[selected=true]:bg-white/80',
          thumb: 'bg-white/80 group-data-[selected=true]:bg-black',
        }}
      />
    )}
  </Group>
);
