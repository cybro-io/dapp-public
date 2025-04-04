'use client';

import { useEffect } from 'react';

import { track } from './analytics';
import { AnalyticsEvent } from './events';

export const PageViewAnalytics = ({
  pageType,
  pageId,
}: {
  pageType: AnalyticsEvent.PageLoadSwap | AnalyticsEvent.PageLoadVault;
  pageId?: string | number;
}) => {
  useEffect(() => {
    track.event(pageType, { pageId });
  }, [pageType, pageId]);

  return null;
};
