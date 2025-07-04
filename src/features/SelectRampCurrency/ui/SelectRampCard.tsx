import React from 'react';

import clsx from 'clsx';
import { useMediaQuery } from 'usehooks-ts';

import { MunzenCurrency } from '@/entities/Munzen';
import { StarIconButton, Text, TextView } from '@/shared/ui';

type RampCardProps = {
  currency: MunzenCurrency;
  onClickFavorite: (state: boolean) => void;
  isFavorite?: boolean;
  isActive?: boolean;
  onSelectCurrency?: (currency: MunzenCurrency) => void;
};

export const SelectRampCard = ({
  isActive,
  currency,
  onClickFavorite,
  isFavorite,
  onSelectCurrency,
}: RampCardProps) => {
  const isSmallScreen = useMediaQuery('(max-width: 1279px)');

  const [isLoadedImg, setIsLoadedImg] = React.useState<boolean>(false);

  return (
    <div
      className={clsx(
        'p-2 xl:p-4 inline-flex flex-row gap-4 items-center rounded-[14px] w-[calc(100%-4px)] xl:w-[calc(100%-6px)] cursor-pointer',
        isActive ? 'bg-background-chips' : 'bg-transparent',
        !isActive &&
          'hover:border-stroke-tableBorder hover:border-[1px] hover:border-solid',
      )}
      onClick={() => onSelectCurrency?.(currency)}
    >
      <div className="inline-flex gap-[9px] items-center flex-1">
        <div className="relative">
          <img
            onLoad={() => {
              setIsLoadedImg(true);
            }}
            src={currency.logoUrl}
            alt={currency.viewedTicker}
            data-loaded={isLoadedImg}
            className="rounded-full data-[loaded=false]:bg-stroke-tableBorder size-6 xl:size-8"
          />
        </div>

        <div className="flex flex-col gap-px">
          <Text textView={isSmallScreen ? TextView.P3 : TextView.BP1}>
            {currency.viewedTicker}
          </Text>
          <Text textView={isSmallScreen ? TextView.C4 : TextView.BP3}>
            {currency.isCrypto ? currency.blockchainNetwork : currency.name}
          </Text>
        </div>
      </div>
      {!isSmallScreen && (
        <StarIconButton
          isActive={isFavorite}
          onClick={(event) => {
            event.stopPropagation();
            onClickFavorite(!isFavorite);
          }}
        />
      )}
    </div>
  );
};
