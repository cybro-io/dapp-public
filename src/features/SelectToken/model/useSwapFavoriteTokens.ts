import React from 'react';

import { Token } from 'symbiosis-js-sdk';
import { useBoolean, useLocalStorage } from 'usehooks-ts';

import { getUniqueTokenId } from '@/entities/SwapToken';

const FAVORITE_TOKENS_KEY = 'swap-favorite-tokens';

export const useSwapFavoriteTokens = (tokens: Token[]) => {
  const [favoriteTokensStorage, setFavoriteTokensStorage] = useLocalStorage<
    string[]
  >(FAVORITE_TOKENS_KEY, []);

  const { value: onlyFavorite, toggle: toggleOnlyFavorite } = useBoolean(false);
  const isFavoriteToken = (uniqueTokenId: string) =>
    favoriteTokensStorage.includes(uniqueTokenId);

  const favoriteTokens = React.useMemo(
    () =>
      tokens.filter(
        (token) =>
          !onlyFavorite ||
          isFavoriteToken(
            getUniqueTokenId(token.address, token.chainId, token.chainFromId),
          ),
      ),
    [tokens, onlyFavorite, favoriteTokensStorage],
  );

  const removeFavoriteToken = (uniqueTokenId: string) => {
    setFavoriteTokensStorage((prevState) =>
      prevState.filter((token) => token !== uniqueTokenId),
    );
  };

  const addFavoriteToken = (uniqueTokenId: string) => {
    setFavoriteTokensStorage((prevState) => [...prevState, uniqueTokenId]);
  };

  const isEmptyFavoriteTokens = favoriteTokens.length < 1 && onlyFavorite;

  return {
    favoriteTokens,
    removeFavoriteToken,
    addFavoriteToken,
    isFavoriteToken,
    onlyFavorite,
    toggleOnlyFavorite,
    isEmptyFavoriteTokens,
  };
};
