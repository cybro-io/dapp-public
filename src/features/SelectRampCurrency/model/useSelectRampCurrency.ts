import React from 'react';

import NiceModal from '@ebay/nice-modal-react';

import { MunzenCurrency, useMunzenCurrencies } from '@/entities/Munzen';

import { useRampFavoriteCurrencies } from './useRampFavoriteCurrencies';
import { useRampFilteredCurrencies } from './useRampFilteredCurrencies';

export const useSelectRampCurrency = (
  selectedTokenId: string,
  isCrypto: boolean,
) => {
  const currentModal = NiceModal.useModal();

  const { currencies } = useMunzenCurrencies();

  const {
    onlyFavorite,
    toggleOnlyFavorite,
    favoriteCurrencies,
    addFavoriteCurrency,
    removeFavoriteCurrency,
    isFavoriteCurrency,
    isEmptyFavoriteCurrencies,
  } = useRampFavoriteCurrencies(currencies ?? []);

  const {
    searchCurrency,
    setSearchCurrency,
    filteredCurrencies,
    isEmptyFilteredCurrencies,
  } = useRampFilteredCurrencies(favoriteCurrencies, selectedTokenId, isCrypto);

  const handleToggleFavorite = (state: boolean, uniqueId: string) => {
    state ? addFavoriteCurrency(uniqueId) : removeFavoriteCurrency(uniqueId);
  };

  const registerSearch = () => ({
    value: searchCurrency,
    onValueChange: setSearchCurrency,
  });

  const registerFavorite = () => ({
    isActive: onlyFavorite,
    onClick: toggleOnlyFavorite,
  });

  const closeModal = () => currentModal.remove();

  const handleSelectCurrency = (currency: MunzenCurrency) => {
    currentModal.resolve(currency);
    currentModal.remove();
  };

  return {
    handleToggleFavorite,
    filteredCurrencies,
    registerSearch,
    registerFavorite,
    isFavoriteCurrency,
    handleSelectCurrency,
    closeModal,
    isEmptyFilteredCurrencies,
    isEmptyFavoriteCurrencies,
  };
};
