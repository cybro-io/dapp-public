import React from 'react';

import { InputProps } from '@nextui-org/input';
import { Input } from '@nextui-org/react';
import { SearchIcon } from '@nextui-org/shared-icons';

export type SearchInputV2Props = Pick<
  InputProps,
  'value' | 'onValueChange' | 'onClear' | 'placeholder'
>;

export const SearchInputV2 = (props: SearchInputV2Props) => (
  <Input
    isClearable
    classNames={{
      base: 'w-fit sm:max-w-[44%]',
      inputWrapper: 'border-1',
    }}
    size="sm"
    startContent={<SearchIcon className="text-default-300" />}
    variant="bordered"
    {...props}
  />
);
