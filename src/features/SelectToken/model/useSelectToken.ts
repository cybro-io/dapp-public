import React from 'react';

import NiceModal from '@ebay/nice-modal-react';

import {
  SelectedToken,
  SelectedTokenCrypto,
  SelectedTokenFiat,
} from '@/entities/fund';
import { useMunzenCurrencies } from '@/entities/Munzen';
import { getUniqueSelectedTokenId, useSwapTokens } from '@/entities/SwapToken';
import { useSwapFavoriteTokens } from '@/features/SelectToken';
import { useSwapFilteredTokens } from '@/features/SelectToken/model/useSwapFilteredTokens';
import { links, useWeb3ModalAccount } from '@/shared/lib';

export const useSelectToken = (
  selectedTokenId: string,
  nativeTokensId: string[],
  onlyNativeTokens?: boolean,
  withFiat?: boolean,
) => {
  const currentModal = NiceModal.useModal();

  const { currencies } = useMunzenCurrencies();
  const { tokens } = useSwapTokens();

  const assets = React.useMemo(() => {
    const fiat: SelectedTokenFiat[] =
      (currencies
        ?.filter((currency) => !currency.isCrypto)
        .map((currency) => ({
          isCrypto: false,
          symbol: currency.tickerWithNetwork,
          decimals: currency.decimals,
          logoUrl: currency.logoUrl,
          id: currency.id,
          name: currency.name,
        }))
        .sort((a, b) => {
          if (['USD', 'EUR'].includes(a.symbol)) {
            return -1;
          }

          return a.id - b.id;
        }) as SelectedTokenFiat[]) ?? [];

    const crypto: SelectedTokenCrypto[] = tokens.map((token) => ({
      isCrypto: true,

      address: token.address,
      symbol: token.symbol ?? 'Unnamed',
      decimals: token.decimals,
      logoUrl: token.icons?.small ?? links.noImage,

      chain: {
        id: token.chainId,
        logoUrl: token.chain?.icons.small ?? links.noImage,
        name: token.chain?.name ?? 'Unnamed chain',
      },
    }));

    if (withFiat) {
      return [...fiat, ...crypto];
    }

    return crypto;
  }, [currencies, tokens, withFiat]);

  const {
    favoriteTokens,
    addFavoriteToken,
    removeFavoriteToken,
    isFavoriteToken,
    onlyFavorite,
    toggleOnlyFavorite,
    isEmptyFavoriteTokens,
  } = useSwapFavoriteTokens(
    onlyNativeTokens
      ? assets.filter((token) =>
          nativeTokensId.includes(getUniqueSelectedTokenId(token)),
        )
      : assets,
  );

  const { filteredTokens, setSearchToken, searchToken, isEmptyFilteredTokens } =
    useSwapFilteredTokens(favoriteTokens, selectedTokenId, nativeTokensId);

  const handleToggleFavorite = (state: boolean, uniqueId: string) => {
    state ? addFavoriteToken(uniqueId) : removeFavoriteToken(uniqueId);
  };

  const { address } = useWeb3ModalAccount();

  const registerSearch = () => ({
    value: searchToken,
    onValueChange: setSearchToken,
  });

  const registerFavorite = () => ({
    isActive: onlyFavorite,
    onClick: toggleOnlyFavorite,
  });

  const closeModal = () => currentModal.remove();

  const handleSelectToken = (token: SelectedToken) => {
    currentModal.resolve(token);
    currentModal.remove();
  };

  return {
    address,
    handleToggleFavorite,
    filteredTokens,
    registerSearch,
    registerFavorite,
    isFavoriteToken,
    handleSelectToken,
    closeModal,
    isEmptyFilteredTokens,
    isEmptyFavoriteTokens,
  };
};
