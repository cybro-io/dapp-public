import React, { useMemo } from 'react';

import { Selection, SortDescriptor } from '@nextui-org/react';
import { TableCellProps, TableColumnProps } from '@nextui-org/table';
import * as lodash from 'lodash';
import { useLocalStorage } from 'usehooks-ts';

type Key = string | number;

export enum TableColumnType {
  default = 'default',
  enum = 'enum',
}

export type DictionaryT = Record<string, React.ReactNode>;
export type ColumnPropsT<T> = Pick<
  TableColumnProps<T>,
  'className' | 'style' | 'as'
>;
export type CellPropsT = Pick<TableCellProps, 'className' | 'style' | 'as'> & {
  dictionary?: DictionaryT;
};
export type TableFilterT<T extends object> = Record<keyof T | Key, Selection>;

interface TableColumn<T extends object> {
  key: keyof T | Key;
  headerName: string;
  renderCell?: (row: T, cellProps?: CellPropsT) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  searchable?: boolean;
  mountInvisible?: boolean;
  type?: TableColumnType;
  headerProps?: ColumnPropsT<T>;
  cellProps?: CellPropsT;
}

export type TableColumns<T extends object> = Array<TableColumn<T>>;

export interface UseTableProps<T extends object> {
  name: string;
  columns: TableColumns<T>;
  limit?: number;
  defaultSort?: SortDescriptor;
}

const TABLE_PREFIX = 'table_';

export const useTable = <T extends object>({
  name,
  columns,
  limit = 10,
  defaultSort,
}: UseTableProps<T>) => {
  /* Pagination */
  const [page, setPage] = React.useState(1);
  const offset = (page - 1) * limit;

  const getCellProps = (row: T, key: TableColumn<T>['key']) => {
    const findColumn = columns.find((column) => column.key === key);

    if (!findColumn) {
      return {};
    }

    return findColumn.cellProps;
  };

  /* Render cell */
  const renderCell = (row: T, key: TableColumn<T>['key']) => {
    const findColumn = columns.find((column) => column.key === key);

    if (!findColumn) {
      return null;
    }

    if (findColumn.renderCell) {
      return findColumn.renderCell(row, findColumn.cellProps);
    }

    const value = lodash.get(row, key);

    if (
      findColumn.type === TableColumnType.enum &&
      findColumn.cellProps?.dictionary &&
      findColumn.cellProps.dictionary[value]
    ) {
      return findColumn.cellProps.dictionary[value];
    }

    return value;
  };

  /* Search */
  const defaultSearches = Object.fromEntries(
    columns.filter(({ searchable }) => searchable).map(({ key }) => [key, '']),
  ) as Record<keyof T, string>;

  const [searches, setSearches] =
    React.useState<Record<keyof T, string>>(defaultSearches);

  const getSearchProps = React.useCallback(
    (key: keyof T) => ({
      value: searches[key],
      onValueChange: (value: string) => {
        setSearches((prevState) => ({ ...prevState, [key]: value }));
        setPage(1);
      },
      onClear: () => {
        setSearches((prevState) => ({ ...prevState, [key]: '' }));
        setPage(1);
      },
    }),
    [searches],
  );

  /* Sorting */
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>(
    defaultSort ?? {},
  );

  const sortProps = {
    sortDescriptor,
    onSortChange: setSortDescriptor,
  };

  /* Can use front-end sorting sortItems(rows) */
  const sortItems = React.useCallback(
    (data: Array<T>) => {
      return data.sort((a, b) => {
        const first = lodash.get(a, sortDescriptor.column as keyof T);
        const second = lodash.get(b, sortDescriptor.column as keyof T);
        const cmp = first < second ? -1 : first > second ? 1 : 0;

        return sortDescriptor.direction === 'descending' ? -cmp : cmp;
      });
    },
    [sortDescriptor],
  );

  /* Columns visibility */
  const [
    visibleColumnsLocalStorage,
    setVisibleColumnsLocalStorage,
    removeVisibleColumnsLocalStorage,
  ] = useLocalStorage<Key[] | 'all' | undefined>(
    TABLE_PREFIX + name,
    undefined,
  );

  const defaultVisibleColumns = useMemo(
    () =>
      columns
        .filter((column) => !column.mountInvisible)
        .map((column) => column.key) as Key[],
    [columns],
  );

  const [visibleColumns, setVisibleColumnsState] = React.useState<Selection>(
    visibleColumnsLocalStorage === 'all'
      ? visibleColumnsLocalStorage
      : new Set(visibleColumnsLocalStorage ?? defaultVisibleColumns),
  );

  const setVisibleColumns = (value: Selection) => {
    setVisibleColumnsState(value);

    const arrayValue = [...value];
    if (lodash.isEqual(defaultVisibleColumns, arrayValue)) {
      removeVisibleColumnsLocalStorage();
    } else {
      setVisibleColumnsLocalStorage(value === 'all' ? value : arrayValue);
    }
  };

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === 'all') return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.key as Key),
    );
  }, [visibleColumns, columns]);

  const dictionaryColumns = React.useMemo(() => {
    return columns.reduce(
      (acc, column) => ({ ...acc, [column.key]: column.headerName }),
      {},
    );
  }, [columns]);

  /* Filters */
  const defaultFilters = Object.fromEntries(
    columns
      .filter(({ filterable }) => filterable)
      .map(({ key }) => [key, 'all']),
  ) as Record<keyof T | Key, Selection>;

  const [filters, setFilters] =
    React.useState<Record<keyof T | Key, Selection>>(defaultFilters);

  const filterByValue = (filterKey: string, items: Array<T>) => {
    return filterTable(filters, filterKey, items);
  };

  const setFilter = (filterKey: string, value: Selection) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterKey]: value }));
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
    setSearches(defaultSearches);
    setPage(1);
  };

  const isHasFilter = useMemo(
    () =>
      Object.values(filters).some((value) => value !== 'all') ||
      Object.values(searches).some((value) => Boolean(value)),
    [filters, searches],
  );

  return {
    filterByValue,
    limit,
    offset,
    headerColumns,
    columns,
    dictionaryColumns,
    renderCell,
    searches,
    getSearchProps,
    page,
    setPage,
    sortProps,
    visibleColumns,
    setVisibleColumns,
    sortItems,
    filters,
    setFilter,
    clearFilters,
    isHasFilter,
    getCellProps,
  };
};

export const filterTable = <T extends object>(
  filters: TableFilterT<T>,
  filterKey: string,
  items: Array<T>,
) => {
  const filterValue = filters[filterKey];
  if (filterValue && filterValue !== 'all') {
    const value = [...filterValue];

    items = items.filter((item) => {
      const itemValue = lodash.get(item, filterKey);
      return value.includes(itemValue);
    });
  }

  return items;
};
