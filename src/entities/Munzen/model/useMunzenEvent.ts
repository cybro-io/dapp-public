import { useEventListener } from 'usehooks-ts';

import { MunzenWidgetEvent, MunzenWidgetMessageEventData } from './types';

export const useMunzenEvent = (callback: (data: MunzenWidgetEvent) => void) => {
  useEventListener(
    'message',
    (event: MessageEvent<MunzenWidgetMessageEventData>) => {
      if (event.data.source === 'nearpay_widget') {
        callback(event.data.data);
      }
    },
  );
};
