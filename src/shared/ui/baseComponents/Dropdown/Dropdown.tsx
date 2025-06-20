'use client';

import React, { ButtonHTMLAttributes } from 'react';

import {
  Dropdown as NextUIDropdown,
  DropdownItem as NextUIDropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/dropdown';
import clsx from 'clsx';

import ChevronIcon from '@/shared/assets/icons/chevron-up.svg';
import { ComponentWithProps } from '@/shared/types';

import styles from './Dropdown.module.scss';
import { DropdownItem } from './types';

type DropdownProps = {
  items: DropdownItem[];
  selectedTitle?: any;
  selectedKey: any;
  setSelected: (...props: any[]) => void;
  buttonContent?: string | React.ReactNode;
  buttonProps?: DropdownButtonProps;
};

type DropdownButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  endIcon?: React.ReactNode;
};

export const DropdownButton = React.forwardRef(
  (
    { children, className, endIcon, ...props }: DropdownButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) => (
    <button
      {...props}
      className={clsx(styles.button, styles.rounded, className)}
      ref={ref}
    >
      {children}
      {endIcon}
    </button>
  ),
);

export const Dropdown: ComponentWithProps<DropdownProps> = ({
  items,
  buttonContent,
  selectedKey,
  setSelected,
  className,
  buttonProps,
}) => {
  const [isOpened, setIsOpened] = React.useState(false);

  const selectedTitle = items.find((item) => item.key === selectedKey)?.label;

  return (
    <NextUIDropdown className={clsx(className)} onOpenChange={setIsOpened}>
      <DropdownTrigger>
        <DropdownButton {...buttonProps}>
          {buttonContent ?? selectedTitle}
          <div className={clsx(styles.arrow, isOpened && styles.isOpened)}>
            <ChevronIcon />
          </div>
        </DropdownButton>
      </DropdownTrigger>
      <DropdownMenu>
        {items.map((item) => (
          <NextUIDropdownItem
            key={item.key}
            onClick={(event) => setSelected(item.key, event)}
            className={clsx(selectedKey === item.key && styles.selected)}
          >
            {item.label}
          </NextUIDropdownItem>
        ))}
      </DropdownMenu>
    </NextUIDropdown>
  );
};
