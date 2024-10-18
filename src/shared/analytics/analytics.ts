'use client';

import mixpanel, { Dict } from 'mixpanel-browser';

import { AnalyticsEvent, typeByEvent } from '@/shared/analytics/events';

const MIXPANEL_ID = process.env.NEXT_PUBLIC_MIXPANEL_ID;

if (typeof window !== 'undefined') {
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
  event: (eventName: AnalyticsEvent, parameters?: Dict) => {
    mixpanel.track(eventName, parameters);

    // `window.safary.track` is available when `document.readyState === 'complete'`
    window?.safary?.track?.({
      eventType: typeByEvent[eventName],
      eventName,
      parameters,
    });

    window?.hj?.('event', eventName);
  },
  identify: (id: string) => {
    mixpanel.identify(id);
    window?.hj?.('identify', id);
  },
  alias: (id: string) => {
    mixpanel.alias(id);
  },
  people: {
    set: (props: Dict) => {
      mixpanel.people.set(props);
    },
  },
};
