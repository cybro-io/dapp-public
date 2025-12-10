import React from 'react';

import {
  Select as VendorSelect,
  SelectProps,
  SelectItem,
} from '@heroui/select';
import clsx from 'clsx';

export const Select = ({ children, ...props }: SelectProps) => {
  return (
    <VendorSelect
      {...props}
      classNames={{
        ...props.classNames,
        trigger: clsx(
          'bg-background-chips data-[hover=true]:bg-background-chips-50',
          props.classNames?.trigger,
        ),
      }}
    >
      {children}
    </VendorSelect>
  );
};

Select.Item = SelectItem;
