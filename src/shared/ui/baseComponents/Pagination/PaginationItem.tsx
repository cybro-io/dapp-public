import React from 'react';

import { PaginationItemValue } from '@heroui/react';
import { UsePaginationReturn } from '@heroui/use-pagination';

import { Button, ButtonSize, ButtonView } from '@/shared/ui';

type PaginationItemProps = {
  item: PaginationItemValue;
  isDisabled?: boolean;
} & Pick<UsePaginationReturn, 'setPage' | 'activePage'>;

export const PaginationItem = ({
  item,
  setPage,
  activePage,
  isDisabled,
}: PaginationItemProps) => {
  if (typeof item !== 'number') {
    return (
      <div className="font-unbounded font-medium text-xs text-white/30 size-9 text-center p-3 cursor-default select-none">
        ...
      </div>
    );
  }

  return (
    <Button
      key={`page-${item}`}
      size={ButtonSize.Small}
      view={activePage === item ? ButtonView.Secondary : ButtonView.Accent}
      onClick={() => setPage(item)}
      disabled={isDisabled}
    >
      {item}
    </Button>
  );
};
