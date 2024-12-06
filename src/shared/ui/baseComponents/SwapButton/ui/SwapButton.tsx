'use client';

import React, { ButtonHTMLAttributes } from 'react';

import SwapWhiteIcon from '@/shared/assets/icons/swap-white.svg';
import { IconButton } from '@/shared/ui';

export const SwapButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <div className="h-11 inline-flex items-center">
      <div
        className={
          'bg-[url("/RectBg.svg")] h-[31px] bg-repeat bg-left bg-[length:31px] flex-1'
        }
      />
      <IconButton icon={<SwapWhiteIcon />} {...props} />
      <div className='bg-[url("/RectBg.svg")] h-[31px] bg-repeat bg-right bg-[length:31px] flex-1'></div>
    </div>
  );
};
