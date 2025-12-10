import React from 'react';

import NiceModal from '@ebay/nice-modal-react';
import AutoSize from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import { useMediaQuery } from 'usehooks-ts';

import { useSelectRampCurrency } from '@/features/SelectRampCurrency';
import {
  Modal,
  SearchInput,
  StarIconButton,
  Text,
  TextView,
} from '@/shared/ui';

import { SelectRampCard } from './SelectRampCard';

type SelectRampCurrencyProps = {
  selectedCurrencyId: string;
  isCrypto: boolean;
};

export const SelectRampModal = NiceModal.create<SelectRampCurrencyProps>(
  ({ selectedCurrencyId, isCrypto }) => {
    const {
      filteredCurrencies,
      handleToggleFavorite,
      registerSearch,
      isFavoriteCurrency,
      registerFavorite,
      handleSelectCurrency,
      closeModal,
      isEmptyFilteredCurrencies,
      isEmptyFavoriteCurrencies,
    } = useSelectRampCurrency(selectedCurrencyId, isCrypto);

    const isSmallScreen = useMediaQuery('(max-width: 1279px)');

    return (
      <Modal
        scrollBehavior="inside"
        onClose={closeModal}
        classNames={{ base: 'sm:min-h-[714px] sm:max-w-[375x]' }}
      >
        <Modal.Header>{'Select currency\nto send'}</Modal.Header>
        <Modal.Body className="overflow-hidden">
          <SearchInput
            endContent={<StarIconButton {...registerFavorite()} />}
            placeholder="Search"
            {...registerSearch()}
          />

          <div className="flex flex-row gap-2 xl:gap-4 flex-1 overflow-hidden xl:min-h-0 min-h-[360px]">
            <div className="rounded-[22px] bg-background-tableRow overflow-auto p-2 xl:p-4 pr-1 flex-[1.5] xl:flex-1">
              {isEmptyFilteredCurrencies && (
                <div className="w-full h-[75px] flex items-center justify-center text-center">
                  <Text textView={TextView.BP3} className="opacity-40">
                    Nothing found. Try again.
                  </Text>
                </div>
              )}

              {isEmptyFavoriteCurrencies && (
                <div className="w-full h-[75px] flex items-center justify-center text-center">
                  <Text textView={TextView.BP3} className="opacity-40">
                    You don’t have any token in your Favourites
                  </Text>
                </div>
              )}

              {!isEmptyFilteredCurrencies && !isEmptyFavoriteCurrencies && (
                <AutoSize>
                  {(size) => (
                    <FixedSizeList
                      height={size.height}
                      width={size.width}
                      itemCount={filteredCurrencies.length}
                      itemSize={isSmallScreen ? 56 : 83}
                    >
                      {({ index, style }) => {
                        const currency = filteredCurrencies[index];
                        const uniqueId = currency.tickerWithNetwork;
                        return (
                          <div style={{ ...style, marginBottom: 8 }}>
                            <SelectRampCard
                              key={index}
                              currency={currency}
                              onClickFavorite={(state) =>
                                handleToggleFavorite(state, uniqueId)
                              }
                              isFavorite={isFavoriteCurrency(uniqueId)}
                              isActive={selectedCurrencyId === uniqueId}
                              onSelectCurrency={handleSelectCurrency}
                            />
                          </div>
                        );
                      }}
                    </FixedSizeList>
                  )}
                </AutoSize>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  },
);
