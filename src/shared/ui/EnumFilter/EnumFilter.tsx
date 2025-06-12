import React, { HTMLAttributes } from 'react';

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection,
  SharedSelection,
} from '@heroui/react';
import { capitalize } from '@heroui/shared-utils';
import clsx from 'clsx';

import ArrowIcon from '@/shared/assets/icons/chevron-up.svg';
import { DictionaryT } from '@/shared/lib';
import { DropdownButton } from '@/shared/ui';

export interface EnumFilterProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  name: string;
  selectedKeys: Selection;
  onSelectionChange: (keys: SharedSelection) => void;
  dictionary: DictionaryT;
}

export const EnumFilter = ({
  selectedKeys,
  onSelectionChange,
  name,
  dictionary,
  className,
}: EnumFilterProps) => {
  const dictionaryItems = Object.entries(dictionary);

  return (
    <Dropdown>
      <DropdownTrigger className={clsx(className)}>
        <DropdownButton className="group">
          {name}
          <ArrowIcon className="rotate-180 group-aria-[expanded=true]:rotate-0 transition-transform" />
        </DropdownButton>
      </DropdownTrigger>
      <DropdownMenu
        closeOnSelect={false}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        onSelectionChange={(value) => {
          onSelectionChange(
            Array.from(value).length === dictionaryItems.length ? 'all' : value,
          );
        }}
      >
        {dictionaryItems.map(([key, value]) => (
          <DropdownItem key={key} className="capitalize">
            {typeof value === 'string' ? capitalize(value) : value}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
