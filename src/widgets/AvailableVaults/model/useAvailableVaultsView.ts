'use client';

import { useLocalStorage } from 'usehooks-ts';

import { track, AnalyticsEvent } from '@/shared/analytics';

import { AvailableVaultsViewType } from './types';

const AVAILABLE_VAULTS_VIEW_KEY = 'availableVaultsView';

export const useAvailableVaultsView = () => {
  const [viewType, setAvailableVaultsView] =
    useLocalStorage<AvailableVaultsViewType>(
      AVAILABLE_VAULTS_VIEW_KEY,
      AvailableVaultsViewType.Table,
    );

  const setViewType = (viewType: AvailableVaultsViewType) => {
    setAvailableVaultsView(viewType);
    track.event(AnalyticsEvent.ChangeVaultListStyle, { viewType });
  };

  return { viewType, setViewType };
};
