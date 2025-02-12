'use client';

import React from 'react';

import { Tooltip, TooltipProps } from '@nextui-org/react';

import WarningIcon from '@/shared/assets/icons/warning-icon.svg';

interface AlertTooltipProps extends Pick<TooltipProps, 'content'> {}

export const AlertTooltip = ({ content }: AlertTooltipProps) => {
  if (!content) return null;

  return (
    <Tooltip content={content} color="default">
      <button>
        <WarningIcon className="size-5 text-red-500" />
      </button>
    </Tooltip>
  );
};
