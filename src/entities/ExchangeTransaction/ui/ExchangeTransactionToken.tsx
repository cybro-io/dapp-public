import React from 'react';

import { BigNumber } from 'bignumber.js';
import { useMediaQuery } from 'usehooks-ts';

import { Text, TextView } from '@/shared/ui';

export type ExchangeTransactionTokenProps = {
  name: string;
  icon: string;
  chainIcon?: string;
  amount: string | number;
  directionName: string;
};

export const ExchangeTransactionToken = ({
  icon,
  amount,
  name,
  directionName,
  chainIcon,
}: ExchangeTransactionTokenProps) => {
  const isSmallScreen = useMediaQuery('(max-width: 1279px)');

  return (
    <div className="flex flex-row items-center gap-[7px]">
      <div className="relative">
        <img
          src={icon}
          className="size-5 xl:size-[46px] rounded-full bg-stroke-tableBorder"
          alt={name}
        />
        {chainIcon && (
          <img
            src={chainIcon}
            className="size-[7px] xl:size-4 rounded-full absolute right-0 bottom-0 bg-stroke-tableBorder"
            alt={`Chain icon ${name}`}
          />
        )}
      </div>

      <div className="flex flex-col gap-1">
        <div className="flex flex-col gap-px">
          <Text textView={isSmallScreen ? TextView.BU2 : TextView.H4}>
            {new BigNumber(amount).toFixed(4)}
          </Text>
          <Text
            textView={isSmallScreen ? TextView.BP3 : TextView.C4}
            className="!font-unbounded !font-light opacity-50"
          >
            {name}
          </Text>
        </div>

        <Text
          textView={TextView.C4}
          className="!hidden xl:!block !font-unbounded !font-light opacity-50"
        >
          {directionName}
        </Text>
      </div>
    </div>
  );
};
