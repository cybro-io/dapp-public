'use client';

import React from 'react';

import './Exchange.scss';
import { ExchangeProvider, useExchangeContext } from '../model/ExchangeContext';

import { ExchangeForm } from './ExchangeForm';

export const Exchange = () => {
  return (
    <ExchangeProvider>
      <ExchangeWrapper />
    </ExchangeProvider>
  );
};

const ExchangeWrapper = () => {
  const { isMaxAmountZero } = useExchangeContext();

  if (isMaxAmountZero) {
    return null;
  }

  return (
    <div className="mb-10 lg:mb-5 flex flex-col gap-6">
      <div className="px-2">
        <div className="corner-root  pl-5 xl:pl-[84px] pr-5 xl:pr-[90px] relative z-0 mx-auto w-[335px] lg:w-full max-w-[1294px] h-[355px] lg:h-[626px] flex justify-between pt-[30px] lg:pt-[36px]">
          <div className="pt-0 lg:pt-[30px] h-[336px] flex-col justify-start items-start gap-4 inline-flex">
            <div className="max-w-[613px] lg:text-left text-center">
              <span className="text-black text-[25px] lg:text-6xl font-bold font-unbounded uppercase leading-[30px] lg:!leading-[72px]">
                Buy or Sell CYBRO Tokens&nbsp;
              </span>
              <span className="text-white text-[25px] lg:text-6xl px-3 bg-black font-bold font-unbounded uppercase leading-[30px] lg:!leading-[72px]">
                Instantly
              </span>
            </div>

            <div className="lg:self-start self-center lg:text-left text-center w-[284px] lg:w-[239px] text-black text-[14px] lg:text-[15px] font-normal font-poppins leading-relaxed">
              Can’t access listed exchanges? Buy or sell CYBRO directly here
              with ETH or USDB on Blast. Quick, easy, and instant.
            </div>
          </div>

          <ExchangeForm className="hidden lg:flex" />
        </div>
      </div>

      <ExchangeForm className="flex lg:hidden self-center" />
    </div>
  );
};

export default Exchange;
