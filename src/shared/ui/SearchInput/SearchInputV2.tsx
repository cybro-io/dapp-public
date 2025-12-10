import React from 'react';

import { InputProps } from '@heroui/input';
import { Input } from '@heroui/react';
import { SearchIcon } from '@heroui/shared-icons';
import clsx from 'clsx';

export type SearchInputV2Props = Pick<
  InputProps,
  | 'value'
  | 'onValueChange'
  | 'onClear'
  | 'placeholder'
  | 'classNames'
  | 'variant'
>;

export const SearchInputV2 = ({
  classNames,
  variant = 'flat',
  ...props
}: SearchInputV2Props) => (
  <Input
    isClearable
    classNames={{
      ...classNames,
      base: clsx('w-full', classNames?.base),
      inputWrapper: clsx('bg-background-tableRow', classNames?.inputWrapper),
      input: clsx('placeholder:text-white/40', classNames?.input),
    }}
    size="sm"
    startContent={<SearchIcon className="text-white" />}
    variant={variant}
    {...props}
  />
);
