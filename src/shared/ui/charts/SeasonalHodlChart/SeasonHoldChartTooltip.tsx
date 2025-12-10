import React from 'react';

import BigNumber from 'bignumber.js';
import dayjs from 'dayjs';
import numeral from 'numeral';

import { SeasonalChartData } from '@/shared/types';
import { Stack, Typography } from '@/shared/ui';

interface SeasonHoldChartTooltipProps {
  label: string;
  active: boolean;
  payload: Array<{
    dataKey: string;
    value: number;
    payload: SeasonalChartData;
  }>;
}

export const SeasonHoldChartTooltip = (props: unknown) => {
  const { active, label, payload } = props as SeasonHoldChartTooltipProps;

  if (!active) {
    return null;
  }

  const btc = payload.find((item) => item.dataKey === 'btc_normalized')!;
  const sharePrice = payload.find((item) => item.dataKey === 'share_price')!;

  return (
    <div className="bg-background-chips rounded-lg p-4 flex flex-col gap-2">
      <Typography variant="caption" order={2}>
        {dayjs(label).format('DD/MM/YYYY')}
      </Typography>

      <Stack className="gap-1">
        <Typography variant="caption" order={4} className="!text-white/60">
          BTC HODL: {new BigNumber(btc.value).dp(6).toNumber()} ($
          {numeral(btc.payload.btc_price).format('0.00a')})
        </Typography>
        <Typography variant="caption" order={4} className="!text-white/60">
          Fund: {new BigNumber(sharePrice.value).dp(6).toNumber()}
        </Typography>
      </Stack>
    </div>
  );
};
