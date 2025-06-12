import { Nullable } from '@/shared/types';

export const isSeasonalVault = (tags: Nullable<string[]>) =>
  tags?.includes('seasonal');

export const isIndexVault = (tags: Nullable<string[]>) =>
  tags?.includes('index');
