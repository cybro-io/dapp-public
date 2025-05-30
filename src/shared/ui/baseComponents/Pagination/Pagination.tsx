'use client';

import React from 'react';

import {
  PaginationItemType,
  usePagination,
  UsePaginationProps,
} from '@heroui/use-pagination';

import { Button, ButtonSize, ButtonView } from '@/shared/ui';

import { PaginationItem } from './PaginationItem';

type PaginationProps = UsePaginationProps & { isDisabled?: boolean };

export const Pagination = ({
  showControls,
  isDisabled,
  ...props
}: PaginationProps) => {
  const { activePage, setPage, next, previous, range } = usePagination(props);

  return (
    <div className="w-full inline-flex justify-between gap-2 overflow-auto px-6 py-4">
      {showControls && (
        <Button
          size={ButtonSize.Small}
          view={ButtonView.Secondary}
          disabled={activePage === 1 || isDisabled}
          onClick={previous}
        >
          Previous
        </Button>
      )}
      <div className="flex-1 inline-flex gap-0.5 justify-center">
        {range
          .filter(
            (item) =>
              typeof item === 'number' || item === PaginationItemType.DOTS,
          )
          .map((item, index) => (
            <PaginationItem
              key={`page-${item}-${index}`}
              item={item}
              setPage={setPage}
              activePage={activePage}
              isDisabled={isDisabled}
            />
          ))}
      </div>
      {showControls && (
        <Button
          size={ButtonSize.Small}
          view={ButtonView.Secondary}
          disabled={activePage === props.total || isDisabled}
          onClick={next}
        >
          Next
        </Button>
      )}
    </div>
  );
};
