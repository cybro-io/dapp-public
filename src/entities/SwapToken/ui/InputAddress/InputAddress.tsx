import React from 'react';

import { Input, InputProps } from '@heroui/input';
import clsx from 'clsx';

import { truncateMiddle } from '@/shared/lib';
import { DropdownButton } from '@/shared/ui';

type InputAddressProps = Pick<
  InputProps,
  'onChange' | 'id' | 'name' | 'onBlur' | 'value' | 'disabled'
> & {
  onClear?: () => void;
};

export const InputAddress = ({
  onClear,
  value,
  disabled,
  ...restProps
}: InputAddressProps) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);

  const renderValue = React.useMemo(
    () => (isFocused ? String(value) : truncateMiddle(String(value))),
    [value, isFocused],
  );

  if (!value && !isEditing) {
    return (
      <DropdownButton
        type="button"
        disabled={disabled}
        onClick={() => {
          setIsEditing(true);
        }}
      >
        Current Wallet
      </DropdownButton>
    );
  }

  return (
    <Input
      size="sm"
      className="border-stroke-tableBorder"
      radius="full"
      classNames={{
        inputWrapper: clsx(
          'px-4 min-h-[30px] h-[30px]',
          'bg-background-chips group-data-[focus=true]:bg-background-chips data-[hover=true]:bg-background-chips',
          'outline outline-[1px] outline-stroke-tableBorder data-[hover=true]:outline-stroke-whiteBorder',
        ),
        input: 'font-poppins text-[13px] pr-0',
      }}
      placeholder="Enter the wallet address"
      isClearable
      onClear={() => {
        setIsEditing(!isEditing);
        onClear?.();
      }}
      {...restProps}
      disabled={disabled}
      value={renderValue}
      onFocusChange={(isFocused) => {
        setIsFocused(isFocused);
        if (!isFocused && !value) {
          setIsEditing(false);
        }
      }}
    />
  );
};
