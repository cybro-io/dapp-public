import React from 'react';

import numeral from 'numeral';

import { Typography } from '@/shared/ui';

export const SeasonVaultTooltip = (props: any) => {
  return (
    <div className="bg-background-chips rounded-lg p-4 flex flex-col gap-1">
      <Typography variant="caption" order={2}>
        {props.label}
      </Typography>
      {props.payload.map((item: any) => (
        <Typography variant="caption" order={4} className="!text-white/60">
          {item.name}: ${numeral(item.value).format('0.00a')}
        </Typography>
      ))}
    </div>
  );
};
