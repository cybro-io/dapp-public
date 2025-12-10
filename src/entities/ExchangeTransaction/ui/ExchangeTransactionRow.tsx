import React from 'react';

import clsx from 'clsx';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useMediaQuery } from 'usehooks-ts';

import MaximizeIcon from '@/shared/assets/icons/maximize.svg';
import { Text, TextView } from '@/shared/ui';

import {
  ExchangeTransactionToken,
  ExchangeTransactionTokenProps,
} from './ExchangeTransactionToken';

type ExchangeTransactionRowProps = {
  isContained: boolean;
  from: ExchangeTransactionTokenProps;
  to: ExchangeTransactionTokenProps;
  createdAtTimestamp: number | string;
  link?: string;
};

export const ExchangeTransactionRow = ({
  isContained,
  to,
  from,
  createdAtTimestamp,
  link,
}: ExchangeTransactionRowProps) => {
  const isSmallScreen = useMediaQuery('(max-width: 1279px)');

  if (isSmallScreen) {
    return (
      <div
        className={clsx(
          'grid grid-cols-[4fr_1fr] justify-between rounded-[20px] px-4 py-[13px] min-h-[76px]',
          isContained && 'bg-background-tableRow',
        )}
      >
        <div className="flex flex-col justify-between gap-2">
          <div className="flex flex-row gap-2 items-center flex-wrap">
            <ExchangeTransactionToken {...from} />
            <Text textView={TextView.BP3} className="opacity-60">
              for
            </Text>
            <ExchangeTransactionToken {...to} />
          </div>
          <Text
            textView={TextView.C4}
            className="!font-unbounded !font-light opacity-50"
          >
            {dayjs(createdAtTimestamp).format('DD MMM YYYY HH:mm')}
          </Text>
        </div>

        <div className="flex justify-end">
          {link && (
            <Link href={link} target="_blank">
              <MaximizeIcon className="opacity-40" />
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        'grid grid-cols-[231px_1fr_1fr] rounded-[20px] p-[15px] h-[85px]',
        isContained && 'bg-background-tableRow',
      )}
    >
      <ExchangeTransactionToken {...from} />
      <ExchangeTransactionToken {...to} />
      <div
        className={clsx(
          'flex flex-col items-end',
          link ? 'justify-between' : 'justify-end',
        )}
      >
        {link && (
          <Link
            href={link}
            target="_blank"
            className="flex flex-row gap-[5px] items-center font-unbounded font-light"
          >
            <span>Transaction details</span> <MaximizeIcon />
          </Link>
        )}
        <Text
          textView={TextView.C4}
          className="!font-unbounded !font-light opacity-50"
        >
          {dayjs(createdAtTimestamp).format('DD MMM YYYY HH:mm')}
        </Text>
      </div>
    </div>
  );
};
