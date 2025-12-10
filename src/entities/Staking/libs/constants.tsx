import React from 'react';

import { ChainId } from '@lifi/sdk';

import TierBeginnerIcon from '../libs/assets/tier-beginner.svg';
import TierProIcon from '../libs/assets/tier-pro.svg';
import TierWhaleIcon from '../libs/assets/tier-whale.svg';

export enum EStakeTier {
  everyone = 'everyone',
  beginner = 'beginner',
  pro = 'pro',
  whale = 'whale',
}

export interface IStakeTier {
  index: number;
  name: string;
  shouldStake: number;
  shouldStakeUsd: number;
  feeDiscountPercent: number;
  icon: React.ReactNode;
  bg?: string;
  textBg?: string;
  textClass?: string;
}

export const stakeTiers: Record<EStakeTier, IStakeTier> = {
  [EStakeTier.everyone]: {
    index: 0,
    name: 'Everyone',
    shouldStake: 0,
    shouldStakeUsd: 0,
    feeDiscountPercent: 0,
    icon: null,
    textClass: 'text-white/80',
    textBg:
      'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #1A1B25',
  },
  [EStakeTier.beginner]: {
    index: 1,
    name: 'Beginner',
    shouldStake: 3000,
    shouldStakeUsd: 100,
    feeDiscountPercent: 20,
    icon: <TierBeginnerIcon />,
    bg: 'linear-gradient(288deg, #04030B 13.23%, #181922 87.92%)',
    textClass: 'text-white/80',
    textBg:
      'linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), #1A1B25',
  },
  [EStakeTier.pro]: {
    index: 2,
    name: 'Pro',
    shouldStake: 10000,
    shouldStakeUsd: 300,
    feeDiscountPercent: 50,
    icon: <TierProIcon />,
    bg: 'linear-gradient(297deg, #04030B 11.09%, #585861 133.71%)',
    textClass: 'text-white bg-[#68686D]',
  },
  [EStakeTier.whale]: {
    index: 3,
    name: 'Whale',
    shouldStake: 30000,
    shouldStakeUsd: 1000,
    feeDiscountPercent: 90,
    icon: <TierWhaleIcon />,
    bg: 'linear-gradient(309deg, #04030B -26.65%, #787A0E 123.32%)',
    textClass: 'text-text-accent-logoYellow bg-trustScore-yellow-100/30',
  },
};

export const MAX_TIER_INDEX = 3;

export const stakeTiersKeysMap = Object.keys(stakeTiers) as EStakeTier[];
export const stakeTiersValuesMap = Object.values(stakeTiers);

export const STAKE_TIERS_FEE_PROVIDER = {
  address: '0xc9c88893485f169a0b705c60a02455864d986b54',
  chainId: ChainId.BAS,
  decimals: 18,
};
