import React from 'react';

import NiceModal from '@ebay/nice-modal-react';
import AutoSize from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';

import { getUniqueSelectedTokenId } from '@/entities/SwapToken';
import { useSelectToken } from '@/features/SelectToken';
import { useMediaQuery } from '@/shared/lib';
import {
  Modal,
  SearchInput,
  StarIconButton,
  Text,
  TextView,
} from '@/shared/ui';

import { useSwapChainsList } from '../model/useSwapChains';

import { SelectChainsList } from './SelectChainsList';
import { SelectTokenCard } from './SelectTokenCard';

type SelectTokenProps = {
  selectedTokenId: string;
  nativeTokensId?: string[];
  onlyNativeTokens?: boolean;
  disabledSelectChain?: boolean;
  withFiat?: boolean;
};

export const SelectTokenModal = NiceModal.create<SelectTokenProps>(
  ({
    selectedTokenId,
    nativeTokensId = [],
    onlyNativeTokens,
    disabledSelectChain,
    withFiat,
  }) => {
    const { chains } = useSwapChainsList(withFiat);

    const {
      filteredTokens,
      handleToggleFavorite,
      registerSearch,
      isFavoriteToken,
      registerFavorite,
      handleSelectToken,
      closeModal,
      isEmptyFilteredTokens,
      isEmptyFavoriteTokens,
    } = useSelectToken(
      selectedTokenId,
      nativeTokensId,
      onlyNativeTokens,
      withFiat,
    );

    const isSmallScreen = useMediaQuery('md');

    return (
      <Modal
        scrollBehavior="inside"
        onClose={closeModal}
        classNames={{ base: 'sm:min-h-[714px] sm:max-w-[718px]' }}
      >
        <Modal.Header>Select token</Modal.Header>
        <Modal.Body className="overflow-hidden h-full">
          <SearchInput
            endContent={<StarIconButton {...registerFavorite()} />}
            placeholder="Symbol or address"
            {...registerSearch()}
          />

          <div className="flex flex-row gap-2 xl:gap-4 flex-1 overflow-hidden xl:min-h-0 min-h-[360px]">
            {!disabledSelectChain && (
              <SelectChainsList defaultChains={chains} />
            )}
            <div className="rounded-[22px] bg-background-tableRow overflow-auto xl:p-4 px-1 py-3 flex-[1.5] xl:flex-1">
              {isEmptyFilteredTokens && (
                <div className="w-full h-[75px] flex items-center justify-center text-center">
                  <Text textView={TextView.BP3} className="opacity-40">
                    Nothing found. Try again.
                  </Text>
                </div>
              )}

              {isEmptyFavoriteTokens && (
                <div className="w-full h-[75px] flex items-center justify-center text-center">
                  <Text textView={TextView.BP3} className="opacity-40">
                    You don’t have any token in your Favourites
                  </Text>
                </div>
              )}

              {!isEmptyFilteredTokens && !isEmptyFavoriteTokens && (
                <AutoSize>
                  {(size) => (
                    <FixedSizeList
                      height={size.height}
                      width={size.width}
                      itemCount={filteredTokens.length}
                      itemSize={isSmallScreen ? 56 : 83}
                    >
                      {({ index, style }) => {
                        const token = filteredTokens[index];
                        const uniqueId = getUniqueSelectedTokenId(token);
                        return (
                          <div style={{ ...style, marginBottom: 8 }}>
                            <SelectTokenCard
                              key={index}
                              token={token}
                              onClickFavorite={(state) =>
                                handleToggleFavorite(state, uniqueId)
                              }
                              isFavorite={isFavoriteToken(uniqueId)}
                              isActive={selectedTokenId === uniqueId}
                              isNativeToken={nativeTokensId.includes(uniqueId)}
                              onSelectToken={handleSelectToken}
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
