import React from 'react';

import numeral from 'numeral';

import { Typography } from '@/shared/ui';

export const LineChartTooltip = (props: any) => {
  return (
    <div className="bg-background-chips rounded-lg p-4 flex flex-col gap-1">
      {props.payload.map((item: any) => (
        <React.Fragment>
          <Typography variant="caption" order={2}>
            {item.payload.date}
          </Typography>
          <Typography variant="caption" order={4} className="!text-white/60">
            {item.name}: {item.payload.unit === '$' && item.payload.unit}
            {numeral(item.payload.value).format('0.00a')}
            {item.payload.unit !== '$' && item.payload.unit}
          </Typography>
        </React.Fragment>
      ))}
    </div>
  );
};
