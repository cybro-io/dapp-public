import React from 'react';

import clsx from 'clsx';
import AutoSize from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import { useMediaQuery } from 'usehooks-ts';

import { useSelectChain } from '@/features/SelectToken';
import { SearchInput, Text, TextView } from '@/shared/ui';

export const SelectChainsList = () => {
  const {
    setSelectedChain,
    selectedChain,
    chains,
    registerSearchChain,
    isEmptyFilteredChains,
  } = useSelectChain();
  const isSmallScreen = useMediaQuery('(max-width: 1279px)');

  return (
    <div className="p-2 flex flex-col gap-2 flex-1 min-w-[142px] overflow-hidden">
      <Text textView={TextView.H5}>Networks:</Text>
      <SearchInput placeholder="Search" {...registerSearchChain()} />

      {isEmptyFilteredChains && (
        <div className="w-full h-[75px] flex items-center justify-center text-center">
          <Text textView={TextView.BP3} className="opacity-40">
            Nothing found. Try again.
          </Text>
        </div>
      )}

      {!isEmptyFilteredChains && (
        <AutoSize>
          {(size) => (
            <FixedSizeList
              height={size.height - 16.8 - 16 - (isSmallScreen ? 40 : 76)}
              width={size.width}
              itemCount={chains.length}
              itemSize={isSmallScreen ? 30 : 48}
            >
              {({ index, style }) => {
                const chain = chains[index];
                return (
                  <div style={{ ...style }}>
                    <button
                      type="button"
                      className={clsx(
                        'md:h-12 md:w-[calc(100%-6px)] md:px-4 md:py-2 md:gap-[9px] flex flex-row items-center rounded-[14px]',
                        'h-[30px] w-[calc(100%-6px)] px-2 py-1.5 gap-1',
                        chain.id === selectedChain
                          ? 'bg-background-chips'
                          : 'bg-transparent',
                      )}
                      onClick={() =>
                        setSelectedChain(
                          chain.id === selectedChain ? null : chain.id,
                        )
                      }
                    >
                      <img
                        src={chain.icons.small}
                        className="size-4 md:size-8 rounded-full bg-stroke-tableBorder"
                      />
                      <Text
                        textView={isSmallScreen ? TextView.BP2 : TextView.C4}
                        className="md:!text-base !text-xs"
                      >
                        {chain.name}
                      </Text>
                    </button>
                  </div>
                );
              }}
            </FixedSizeList>
          )}
        </AutoSize>
      )}
    </div>
  );
};
