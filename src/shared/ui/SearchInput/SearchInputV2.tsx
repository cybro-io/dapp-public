import React from 'react';

import { InputProps } from '@nextui-org/input';
import { Input } from '@nextui-org/react';
import { SearchIcon } from '@nextui-org/shared-icons';
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
