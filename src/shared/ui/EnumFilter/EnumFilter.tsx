import React, { HTMLAttributes } from 'react';

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection,
  SharedSelection,
} from '@nextui-org/react';
import { ChevronDownIcon } from '@nextui-org/shared-icons';
import { capitalize } from '@nextui-org/shared-utils';
import clsx from 'clsx';

import { DictionaryT } from '@/shared/lib';

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
        <Button
          endContent={<ChevronDownIcon className="text-small" />}
          size="sm"
          radius="full"
          variant="bordered"
          className="border-stroke-tableBorder border-1 bg-background-chips"
        >
          {name}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
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
