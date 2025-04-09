import React from 'react';

import ChevronDownIcon from '@/shared/assets/icons/chevron-down.svg';
import { AssetIcon, Typography } from '@/shared/ui';

interface ButtonSelectTokenProps {
  isDisabled?: boolean;
  label?: string;
  chain: { name: string; icon: string };
  onClick?: () => void;
}

export const ButtonSelectChain = ({
  chain,
  onClick,
  label,
  isDisabled,
}: ButtonSelectTokenProps) => {
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className="w-full py-2 pl-2.5 pr-4 flex flex-row items-center bg-background-tableRow rounded-[14px] hover:enabled:outline hover:enabled:outline-1 hover:enabled:outline-white/50"
    >
      <div className="flex flex-row gap-2 flex-1 items-center">
        <AssetIcon src={chain.icon} alt={chain.name} width={24} height={24} />
        <div className="flex flex-col items-start">
          {label && (
            <Typography order={3} className="text-white/80" weight="regular">
              {label}
            </Typography>
          )}
          <Typography order={2}>{chain.name}</Typography>
        </div>
      </div>
      {!isDisabled && (
        <span className="flex items-center justify-center size-6">
          <ChevronDownIcon />
        </span>
      )}
    </button>
  );
};
