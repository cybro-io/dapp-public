import React from 'react';

import { Skeleton } from '@nextui-org/react';
import { BigNumber } from 'bignumber.js';
import clsx from 'clsx';

import { SelectedToken, SelectedTokenCrypto } from '@/entities/fund';
import { useWalletBalances } from '@/entities/WalletBalance';
import ExportIcon from '@/shared/assets/icons/export.svg';
import { useMediaQuery } from '@/shared/lib';
import { AssetIcon, Link, StarIconButton, Text, TextView } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

type TokenCardProps = {
  token: SelectedToken;
  onClickFavorite: (state: boolean) => void;
  isFavorite?: boolean;
  isActive?: boolean;
  isNativeToken?: boolean;
  onSelectToken?: (token: SelectedToken) => void;
};

export const SelectTokenCard = ({
  isActive,
  token,
  onClickFavorite,
  isFavorite,
  onSelectToken,
  isNativeToken,
}: TokenCardProps) => {
  const isSmallScreen = useMediaQuery('md');

  const getHrefExplorerFromToken = (token: SelectedTokenCrypto) => {
    if (token.address) {
      return `${token.chain?.explorer}/address/${token.address}`;
    }
    return `${token.chain?.explorer}/tokens`;
  };

  const { isLoadingWalletBalances, walletBalances, findBalanceByToken } =
    useWalletBalances();

  const balance = React.useMemo(() => {
    if (!token.isCrypto) return 0;

    const balance = findBalanceByToken(token.chain.id, token.address);
    return new BigNumber(balance).dp(6, BigNumber.ROUND_DOWN).toNumber();
  }, [walletBalances, token]);

  return (
    <div
      className={clsx(
        'h-[56px] md:h-[84px] p-2 md:p-4 inline-flex flex-row gap-4 items-center rounded-[14px] w-[calc(100%-4px)] md:w-[calc(100%-6px)] cursor-pointer',
        isActive ? 'bg-background-chips' : 'bg-transparent',
        isNativeToken && !isActive && 'bg-background-accentBold/10',
        !isActive &&
          !isNativeToken &&
          'hover:border-stroke-tableBorder hover:border-[1px] hover:border-solid',
      )}
      onClick={() => onSelectToken?.(token)}
    >
      <div className="inline-flex gap-[9px] items-center flex-1">
        <AssetIcon
          src={token.logoUrl}
          width={24}
          height={24}
          alt={token.symbol}
          subImage={
            token.isCrypto
              ? {
                  src: token.chain.logoUrl,
                  alt: token.chain.name,
                  width: 10,
                  height: 10,
                }
              : undefined
          }
        />

        <div className="flex flex-col gap-px">
          <Text textView={isSmallScreen ? TextView.P3 : TextView.BP1}>
            {token.symbol}
          </Text>
          {isLoadingWalletBalances && (
            <Skeleton className="rounded-lg" disableAnimation>
              <div className="h-[18px] w-6 rounded-lg"></div>
            </Skeleton>
          )}
          {!isLoadingWalletBalances && !!balance && (
            <div className="inline-flex gap-[5px]">
              {!isSmallScreen && (
                <Text textView={TextView.C4} className="opacity-70">
                  Balance
                </Text>
              )}
              <Text textView={TextView.C4}>{formatUserMoney(balance)}</Text>
            </div>
          )}
        </div>
      </div>
      {!isSmallScreen && (
        <React.Fragment>
          {token.isCrypto && (
            <Link
              href={getHrefExplorerFromToken(token)}
              target="_blank"
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <ExportIcon className="text-stroke-tableBorder" />
            </Link>
          )}
          <StarIconButton
            isActive={isFavorite}
            onClick={(event) => {
              event.stopPropagation();
              onClickFavorite(!isFavorite);
            }}
          />
        </React.Fragment>
      )}
    </div>
  );
};