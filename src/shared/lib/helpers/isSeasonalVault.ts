import { fundTags } from '@/entities/Vault';
import { Nullable } from '@/shared/types';

export const isSeasonalVault = (tags: Nullable<Nullable<string>[]>) =>
  Boolean(tags?.includes(fundTags.seasonal));

export const isIndexVault = (tags: Nullable<Nullable<string>[]>) =>
  Boolean(tags?.includes(fundTags.index));
