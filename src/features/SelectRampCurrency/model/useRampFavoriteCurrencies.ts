import React from 'react';

import { useBoolean, useLocalStorage } from 'usehooks-ts';

import { MunzenCurrency } from '@/entities/Munzen/model/types';

const FAVORITE_RAMP_CURRENCIES_KEY = 'ramp-favorite-currencies';

export const useRampFavoriteCurrencies = (currencies: MunzenCurrency[]) => {
  const [favoriteRampCurrencies, setFavoriteRampCurrencies] = useLocalStorage<
    string[]
  >(FAVORITE_RAMP_CURRENCIES_KEY, []);

  const { value: onlyFavorite, toggle: toggleOnlyFavorite } = useBoolean(false);
  const isFavoriteCurrency = (currencyId: string) =>
    favoriteRampCurrencies.includes(currencyId);

  const favoriteCurrencies = React.useMemo(
    () =>
      currencies.filter(
        (currency) =>
          !onlyFavorite || isFavoriteCurrency(currency.tickerWithNetwork),
      ),
    [currencies, onlyFavorite, favoriteRampCurrencies],
  );

  const removeFavoriteCurrency = (currencyId: string) => {
    setFavoriteRampCurrencies((prevState) =>
      prevState.filter((currency) => currency !== currencyId),
    );
  };

  const addFavoriteCurrency = (currencyId: string) => {
    setFavoriteRampCurrencies((prevState) => [...prevState, currencyId]);
  };

  const isEmptyFavoriteCurrencies =
    favoriteCurrencies.length < 1 && onlyFavorite;

  return {
    favoriteCurrencies,
    removeFavoriteCurrency,
    addFavoriteCurrency,
    isFavoriteCurrency,
    onlyFavorite,
    toggleOnlyFavorite,
    isEmptyFavoriteCurrencies,
  };
};
