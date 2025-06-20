'use client';

import React from 'react';

import { Input, InputProps } from '@heroui/input';

import CloseCircleIcon from '@/shared/assets/icons/close-circle.svg';
import SearchIcon from '@/shared/assets/icons/search.svg';
import { IconButton } from '@/shared/ui';

type SearchInputProps = Omit<InputProps, 'startContent' | 'onChange'> & {
  onValueChange?: (value: string) => void;
};

export const SearchInput = ({
  value,
  onValueChange,
  endContent,
  ...restProps
}: SearchInputProps) => {
  return (
    <Input
      {...restProps}
      value={value}
      onChange={(event) => onValueChange?.(event.target.value)}
      endContent={
        <div className="inline-flex gap-4">
          {value && (
            <IconButton
              icon={<CloseCircleIcon />}
              onClick={() => onValueChange?.('')}
            />
          )}
          {endContent}
        </div>
      }
      startContent={<SearchIcon className="min-w-6 text-white" />}
      classNames={{
        input:
          '!text-xs sm:!text-base data-[has-start-content=true]:pl-[9px] data-[has-end-content=true]:pr-[9px] font-unbounded text-xl heading-6 font-medium truncate',
        inputWrapper:
          'bg-background-tableRow p-4 h-10 sm:h-[76px]  data-[hover=true]:bg-background-tableRow group-data-[focus=true]:bg-background-tableRow',
      }}
    />
  );
};
