'use client';

import React, { ButtonHTMLAttributes } from 'react';

import clsx from 'clsx';

import SwapWhiteIcon from '@/shared/assets/icons/swap-white.svg';
import { IconButton } from '@/shared/ui';

interface SwapButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  classNameSide?: string;
}

export const SwapButton = ({ classNameSide, ...props }: SwapButtonProps) => {
  return (
    <div className="h-11 inline-flex items-center">
      <div
        className={clsx(
          'bg-[url("/RectBg.svg")] h-[31px] bg-repeat bg-left bg-[length:31px] flex-1',
          classNameSide,
        )}
      />
      <IconButton icon={<SwapWhiteIcon />} {...props} />
      <div
        className={clsx(
          'bg-[url("/RectBg.svg")] h-[31px] bg-repeat bg-right bg-[length:31px] flex-1',
          classNameSide,
        )}
      ></div>
    </div>
  );
};
