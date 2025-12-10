import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';

import { Group, InfoButtonTooltip, Typography } from '@/shared/ui';

import AiImage from './assets/ai.png';
import DexPoolImage from './assets/dex-pool.png';
import HighApyImage from './assets/high-apy.png';
import NewImage from './assets/new.png';
import RewardsImage from './assets/rewards.png';
import SoonImage from './assets/soon.png';
import StableCoinImage from './assets/stablecoin.png';
import UniqueImage from './assets/unique.png';

export const vaultBadges = {
  new: {
    key: 'new',
    text: 'NEW',
    icon: <Image width={20} height={20} src={NewImage} alt="new" />,
    bgColor: 'bg-[#3E391C]',
    textColor: 'text-[#F9E727]',
    description:
      'This vault launched recently and has been active for less than 10 days. APY and performance data may still be volatile.',
  },
  ai: {
    key: 'ai',
    icon: <Image width={20} height={20} src={AiImage} alt="ai" />,
    text: 'AI',
    bgColor: 'bg-[#5A1A54]',
    textColor: 'text-[#FFB6F7]',
    description:
      'This vault is managed by an algorithm without manual intervention. Strategies are selected automatically for optimal performance.',
  },
  stable: {
    key: 'stable',
    icon: <Image width={20} height={20} src={StableCoinImage} alt="stable" />,
    text: 'Stable',
    bgColor: 'bg-[#1F3E1C]',
    textColor: 'text-[#83FF81]',
    description:
      'This vault is backed by stablecoins like USDC or USDT. Typically offers steady, lower-risk returns.',
  },
  rewards: {
    key: 'rewards',
    icon: <Image width={20} height={20} src={RewardsImage} alt="rewards" />,
    text: 'Rewards',
    bgColor: 'bg-[#5A1A1A]',
    textColor: 'text-[#FFB6B6]',
    description:
      'Earn additional bonuses like points, airdrops, or campaign incentives by participating in this vault. Terms may vary.',
  },
  high_apy: {
    key: 'high_apy',
    icon: <Image width={20} height={20} src={HighApyImage} alt="high_apy" />,
    text: 'High APY',
    bgColor: 'bg-[#1A325A]',
    textColor: 'text-[#B6D2FF]',
    description:
      'This vault offers high annual yields — 10% or more. Often comes with increased risk or short-term opportunity.',
  },
  dex_pool: {
    key: 'dex_pool',
    icon: <Image width={20} height={20} src={DexPoolImage} alt="dex_pool" />,
    text: 'DEX Pool',
    bgColor: 'bg-[#1A4F5A]',
    textColor: 'text-[#B6FFF7]',
    description:
      'Yield is generated through liquidity provision on a decentralized exchange. We show fee-based returns instead of APY.',
  },
  unique: {
    key: 'unique',
    icon: <Image width={20} height={20} src={UniqueImage} alt="unique" />,
    text: 'Unique',
    bgColor: 'bg-[#281C3E]',
    textColor: 'text-[#AD81FF]',
    description:
      'This vault features a rare or exclusive strategy you won’t find elsewhere. Highlighted for its distinct mechanics or design.',
  },
  soon: {
    key: 'soon',
    icon: <Image width={20} height={20} src={SoonImage} alt="soon" />,
    text: 'Soon',
    bgColor: 'bg-[#24252E]',
    textColor: 'text-[#F9E727]',
    description:
      'Launching soon: drop your email to be among the first to access this Vault.',
  },
};

export interface VaultBadgeProps {
  icon?: keyof typeof vaultBadges;
  isCompact?: boolean;
  withoutTooltip?: boolean;
}

export const VaultBadge = ({
  icon = 'new',
  isCompact = false,
  withoutTooltip = false,
}: VaultBadgeProps) => {
  const item = vaultBadges[icon];

  if (!item) {
    return null;
  }

  return (
    <InfoButtonTooltip
      classNames={{ content: 'max-w-[266px]' }}
      isDisabled={withoutTooltip}
      content={item.description}
      buttonChildren={
        isCompact && item.key !== 'soon' ? (
          item.icon
        ) : (
          <Group
            className={clsx(
              item.bgColor,
              item.textColor,
              'items-center flex-nowrap gap-[5px] rounded-[20px] p-[4px_10px_4px_4px]',
            )}
          >
            {item.icon}
            <Typography variant="poppins" order={3} className="normal-case">
              {item.text}
            </Typography>
          </Group>
        )
      }
    />
  );
};
