'use client';

import React from 'react';

import { Link } from '@heroui/link';
import { twMerge } from 'tailwind-merge';

import { links } from '@/shared/lib';

import { useExchangeContext } from '../model/ExchangeContext';
import { ExchangeDirection } from '../model/types';

import { ExchangeDetails } from './ExchangeDetails';
import { ExchangeDirectionBuy } from './ExchangeDirectionBuy';
import { ExchangeDirectionSell } from './ExchangeDirectionSell';
import { SelectPaymentMethodModal } from './SelectPaymentMethodModal';

interface ExchangeFormProps
  extends Pick<React.HTMLAttributes<HTMLDivElement>, 'className'> {}

export const ExchangeForm = ({ className }: ExchangeFormProps) => {
  const { direction, onSubmit, modal } = useExchangeContext();

  return (
    <React.Fragment>
      <form
        onSubmit={onSubmit}
        className={twMerge(
          'bg-transparent lg:bg-black rounded-[30px] p-6 w-[375px] flex flex-col gap-2 h-fit',
          className,
        )}
      >
        {direction === ExchangeDirection.buy ? (
          <ExchangeDirectionBuy />
        ) : (
          <ExchangeDirectionSell />
        )}

        <ExchangeDetails />

        <Link
          className="self-center text-white/50 text-[12px] font-normal font-unbounded"
          href={links.howToBuy}
          target="_blank"
        >
          HOW TO BUY?
        </Link>
      </form>

      <SelectPaymentMethodModal
        isOpen={modal.isOpen}
        onOpenChange={modal.onOpenChange}
      />
    </React.Fragment>
  );
};
