'use client';
import React from 'react';

import InOutIcon from '@/shared/assets/icons/in-out.svg';

export const ExchangeDivider = () => {
  return (
    <div className="h-11 w-full relative flex items-center">
      <div
        className={
          'bg-[url("/RectBg.svg")] h-[31px] bg-repeat bg-left bg-[length:27px] flex-1'
        }
      />
      <div className="absolute inset-0 flex justify-center items-center">
        <InOutIcon className="text-text-accent-logoYellow" />
        <InOutIcon className="text-text-accent-logoYellow blur-[1.91px] opacity-50 absolute" />
      </div>
    </div>
  );
};
