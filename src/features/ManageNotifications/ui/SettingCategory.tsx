import React from 'react';

import { Stack, Typography } from '@/shared/ui';

import { SettingCategoryProps } from './types';

export const SettingCategory = ({ children, name }: SettingCategoryProps) => (
  <Stack className="gap-3">
    <Typography variant="caption" order={4} className="text-white/40">
      {name}
    </Typography>
    {children}
  </Stack>
);
