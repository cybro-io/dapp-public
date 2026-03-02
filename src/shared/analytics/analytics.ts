'use client';

import mixpanel, { Dict } from 'mixpanel-browser';

import { AnalyticsEvent, typeByEvent } from '@/shared/analytics/events';
import { isDeviceStandalone } from '@/shared/lib';

const IS_ENABLED =
  process.env.NODE_ENV === 'production' &&
  process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT === 'production';

const MIXPANEL_ID = process.env.NEXT_PUBLIC_MIXPANEL_ID;

if (typeof window !== 'undefined' && IS_ENABLED) {
  if (!MIXPANEL_ID) {
    throw new Error('Mixpannel ID was not found');
  }

  mixpanel.init(MIXPANEL_ID, {
    ignore_dnt: true,
    api_host: 'https://hiddenninja.cybro.io',
    track_pageview: 'url-with-path',
  });
}

export const track = {
  event: (eventName: AnalyticsEvent, defaultParams?: Dict) => {
    const parameters = { ...defaultParams, isPWA: isDeviceStandalone() };

    try {
      if (!IS_ENABLED) {
        return;
      }
      mixpanel.track(eventName, parameters);

      // `window.safary.track` is available when `document.readyState === 'complete'`
      window?.safary?.track?.({
        eventType: typeByEvent[eventName],
        eventName,
        parameters,
      });

      window?.hj?.('event', eventName);
    } catch (error) {
      console.error(error);
    }
  },
  identify: (id: string) => {
    try {
      if (!IS_ENABLED) {
        return;
      }
      mixpanel.identify(id);
      window?.hj?.('identify', id);
    } catch (error) {
      console.error(error);
    }
  },
  alias: (id: string) => {
    try {
      if (!IS_ENABLED) {
        return;
      }
      mixpanel.alias(id);
    } catch (error) {
      console.error(error);
    }
  },
  people: {
    set: (props: Dict) => {
      try {
        if (!IS_ENABLED) {
          return;
        }
        mixpanel.people.set(props);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
