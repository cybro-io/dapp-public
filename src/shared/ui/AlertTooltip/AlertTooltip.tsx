'use client';

import React from 'react';

import { Tooltip, TooltipProps } from '@heroui/react';

import WarningIcon from '@/shared/assets/icons/warning-icon.svg';

interface AlertTooltipProps extends Pick<TooltipProps, 'content'> {
  isVisible?: boolean;
}

export const AlertTooltip = ({ content, isVisible }: AlertTooltipProps) => {
  if (!isVisible) {
    return null;
  }

  return (
    <Tooltip content={content} color="default">
      <button>
        <WarningIcon className="size-5 text-red-500" />
      </button>
    </Tooltip>
  );
};
