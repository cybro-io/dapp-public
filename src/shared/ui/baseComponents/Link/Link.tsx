'use client';

import React from 'react';

import { Tooltip } from '@heroui/react';
import clsx from 'clsx';
import { default as NextLink } from 'next/link';

import InfoIcon from '@/shared/assets/icons/info.svg';
import { ComponentWithProps } from '@/shared/types';
import { LinkView } from '@/shared/ui';

import styles from './Link.module.scss';

type LinkProps = {
  children: React.ReactNode;
  href?: string;
  tooltipContent?: React.ReactNode;
  viewType?: LinkView;
  onClick?: (...args: any) => void;
  textClassName?: string;
  tooltipClassName?: string;
  onTooltipChange?: (isOpen: boolean) => void;
  target?: string;
  isDisabled?: boolean;
};

export const Link: ComponentWithProps<LinkProps> = ({
  viewType = LinkView.Link,
  className,
  tooltipContent,
  href,
  textClassName,
  tooltipClassName,
  onClick,
  onTooltipChange,
  target,
  children,
  isDisabled,
}) => {
  switch (viewType) {
    case LinkView.Link:
      return (
        <NextLink
          className={clsx(styles.text, className)}
          href={href || ''}
          target={target}
          aria-disabled={isDisabled}
          onClick={onClick}
        >
          {children}
        </NextLink>
      );

    case LinkView.Button:
      return (
        <button className={clsx(styles.button, className)} onClick={onClick}>
          {children}
        </button>
      );

    case LinkView.Tooltip:
      return (
        <Tooltip
          className={clsx(styles.contentContainer, tooltipClassName)}
          content={tooltipContent || 'Some content'}
          onOpenChange={onTooltipChange}
          closeDelay={100}
        >
          <div className={clsx(styles.tooltipContainer, className)}>
            <p className={clsx(styles.tooltipText, textClassName)}>
              {children}
            </p>
            <div>
              <InfoIcon />
            </div>
          </div>
        </Tooltip>
      );
  }
};
