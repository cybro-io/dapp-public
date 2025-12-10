'use client';
import React from 'react';

import StarIcon from '@/shared/assets/icons/star.svg';
import { IconButton, IconButtonProps } from '@/shared/ui';

type StarIconButtonProps = Omit<IconButtonProps, 'icon'> & {
  isActive?: boolean;
};

export const StarIconButton = ({
  isActive,
  ...restProps
}: StarIconButtonProps) => {
  return (
    <IconButton
      icon={
        <StarIcon
          className={
            isActive
              ? 'text-background-accentBold fill-background-accentBold'
              : 'text-stroke-tableBorder'
          }
        />
      }
      {...restProps}
    />
  );
};
