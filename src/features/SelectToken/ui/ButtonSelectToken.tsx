import React from 'react';

import ChevronDownIcon from '@/shared/assets/icons/chevron-down.svg';
import CloseCircleIcon from '@/shared/assets/icons/close-circle.svg';
import { AssetIcon, Text, TextView } from '@/shared/ui';

interface ButtonSelectTokenProps {
  isDisabled?: boolean;
  asset: { name: string; icon: string };
  chain?: { name: string; icon?: string };
  onClick?: () => void;
  onClearClick?: () => void;
}

export const ButtonSelectToken = ({
  asset,
  chain,
  onClick,
  onClearClick,
  isDisabled,
}: ButtonSelectTokenProps) => {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className="py-2 pl-2.5 pr-4 flex flex-row items-center bg-background-tableRow rounded-[14px] hover:enabled:outline hover:enabled:outline-1 hover:enabled:outline-white/50"
    >
      <div className="flex flex-row gap-2 flex-1 items-center">
        <AssetIcon
          src={asset.icon}
          alt={asset.name}
          width={24}
          height={24}
          subImage={
            chain?.icon
              ? {
                  src: chain.icon,
                  alt: chain.name,
                  width: 10,
                  height: 10,
                }
              : undefined
          }
        />
        <div className="flex flex-col items-start">
          <Text textView={TextView.BU2}>{asset.name}</Text>
          {chain && <Text textView={TextView.C4}>{chain.name}</Text>}
        </div>
      </div>
      <div className="flex flex-row gap-2.5">
        {onClearClick && !isDisabled && (
          <button
            className="flex items-center justify-center size-6"
            onClick={(event) => {
              event.stopPropagation();
              onClearClick();
            }}
          >
            <CloseCircleIcon />
          </button>
        )}
        {!isDisabled && (
          <span className="flex items-center justify-center size-6">
            <ChevronDownIcon />
          </span>
        )}
      </div>
    </button>
  );
};
