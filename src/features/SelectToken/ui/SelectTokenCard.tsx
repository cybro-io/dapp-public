import React from 'react';

import { Skeleton } from '@nextui-org/react';
import clsx from 'clsx';
import { Token } from 'symbiosis-js-sdk';
import { useMediaQuery } from 'usehooks-ts';

import { useWalletBalances } from '@/entities/WalletBalance';
import ExportIcon from '@/shared/assets/icons/export.svg';
import { Link, StarIconButton, Text, TextView } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

type TokenCardProps = {
  token: Token;
  onClickFavorite: (state: boolean) => void;
  isFavorite?: boolean;
  isActive?: boolean;
  isNativeToken?: boolean;
  onSelectToken?: (token: Token) => void;
};

export const SelectTokenCard = ({
  isActive,
  token,
  onClickFavorite,
  isFavorite,
  onSelectToken,
  isNativeToken,
}: TokenCardProps) => {
  const isSmallScreen = useMediaQuery('(max-width: 1279px)');

  const getHrefExplorerFromToken = (token: Token) => {
    if (token.address) {
      return `${token.chain?.explorer}/address/${token.address}`;
    }
    return `${token.chain?.explorer}/tokens`;
  };

  const [isLoadedImg, setIsLoadedImg] = React.useState<boolean>(false);

  const { isLoadingWalletBalances, walletBalances, findBalanceByToken } =
    useWalletBalances();

  const balance = React.useMemo(
    () => findBalanceByToken(token.chainId, token.address),
    [walletBalances, token.chainId, token.address],
  );

  return (
    <div
      className={clsx(
        'p-2 xl:p-4 inline-flex flex-row gap-4 items-center rounded-[14px] w-[calc(100%-4px)] xl:w-[calc(100%-6px)] cursor-pointer',
        isActive ? 'bg-background-chips' : 'bg-transparent',
        isNativeToken && !isActive && 'bg-background-accentBold/10',
        !isActive &&
          !isNativeToken &&
          'hover:border-stroke-tableBorder hover:border-[1px] hover:border-solid',
      )}
      onClick={() => onSelectToken?.(token)}
    >
      <div className="inline-flex gap-[9px] items-center flex-1">
        <div className="relative">
          <img
            onLoad={() => {
              setIsLoadedImg(true);
            }}
            src={String(token.icons?.small)}
            alt={String(token?.name)}
            data-loaded={isLoadedImg}
            className="rounded-full data-[loaded=false]:bg-stroke-tableBorder size-6 xl:size-8"
          />

          <img
            className="absolute bottom-0 right-0 border-1 border-solid border-stroke-tableBorder bg-stroke-tableBorder rounded-full size-2.5 xl:size-[14px]"
            src={String(token.chain?.icons?.small)}
            alt={String(token.chain?.name)}
          />
        </div>

        <div className="flex flex-col gap-px">
          <Text textView={isSmallScreen ? TextView.P3 : TextView.BP1}>
            {token.symbol}
          </Text>
          {isLoadingWalletBalances && (
            <Skeleton className="rounded-lg" disableAnimation>
              <div className="h-[18px] w-6 rounded-lg"></div>
            </Skeleton>
          )}
          {!isLoadingWalletBalances && (
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
          <Link
            href={getHrefExplorerFromToken(token)}
            target="_blank"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <ExportIcon className="text-stroke-tableBorder" />
          </Link>
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
