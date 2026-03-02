'use client';

import React from 'react';

import { Divider } from '@heroui/react';

import './menu.scss';
import { useFlag } from '@unleash/proxy-client-react';
import Link from 'next/link';

import { StakeTier, useCurrentTier } from '@/entities/Staking';
import { GetCybroBalanceResponse } from '@/entities/Staking/model/useCybroBalance';
import { Flag } from '@/shared/lib';
import { Button, ButtonSize, ButtonView, Group, Stack } from '@/shared/ui';
import { formatMoney, formatUserMoney } from '@/shared/utils';
import { useReferralStats } from '@/widgets/referral/ReferralStats/model/useReferralStats';
import Cybro14Icon from '@assets/assets/cybro-14.svg';
import LCybro14Icon from '@assets/assets/locked-cybro-14.svg';
import ArrowLeftBoldIcon from '@assets/icons/arrow-left-bold.svg';

import { ExclusiveOffer } from './ExclusiveOffer';
import { ProfileStatsField } from './ProfileStatsField';
import { ProfileStatsHeader } from './ProfileStatsHeader';
import { TooltipBalances } from './TooltipBalances';

type ProfileStatsPanelProps = {
  points: number;
  isLoading?: boolean;
  cybroBalance: number;
  lcybroBalance: number;
  balances: GetCybroBalanceResponse[] | undefined;
};

export const ProfileStatsPanel = ({
  points,
  cybroBalance,
  lcybroBalance,
  balances,
  isLoading,
}: ProfileStatsPanelProps) => {
  const { stats, isLoading: isLoadingReferralStats } = useReferralStats();

  const balanceItems = [
    {
      key: 'cybro_balance',
      label: (
        <React.Fragment>
          CYBRO Balance&nbsp;
          <TooltipBalances balances={balances} field="cybro" />
        </React.Fragment>
      ),
      value: (
        <React.Fragment>
          <Cybro14Icon /> {formatMoney(cybroBalance)}
        </React.Fragment>
      ),
      isHide: false,
    },
    {
      key: 'lcybro_balance',
      label: (
        <React.Fragment>
          LCYBRO Balance&nbsp;
          <TooltipBalances balances={balances} field="locked" />
        </React.Fragment>
      ),
      value: (
        <React.Fragment>
          <LCybro14Icon /> {formatMoney(lcybroBalance)}
        </React.Fragment>
      ),
      isHide: !lcybroBalance,
    },
    {
      key: 'cybro_points',
      label: 'CYBRO Points',
      value: `${points} pts`,
      isHide: false,
    },
  ];

  const { currentTier } = useCurrentTier();
  const isEnabledTiers = useFlag(Flag.tiers);

  return (
    <Stack className="flex-nowrap w-[335px] rounded-[28px] overflow-hidden bg-background-chips py-[22px] gap-6">
      <ProfileStatsHeader />
      <Divider />
      <Group className="px-[30px] gap-5 justify-between">
        {balanceItems
          .filter((balance) => !balance.isHide)
          .map((balance) => (
            <ProfileStatsField
              key={balance.key}
              label={balance.label}
              isLoading={isLoading}
            >
              {balance.value}
            </ProfileStatsField>
          ))}
      </Group>
      <Divider />
      <Group className="px-[30px] flex-nowrap justify-between">
        <ProfileStatsField
          label="Referral balance"
          isLoading={isLoadingReferralStats}
        >
          ${formatUserMoney(stats?.total_rewards ?? 0)}
        </ProfileStatsField>

        <Link href="/referrals">
          <Button view={ButtonView.Secondary} size={ButtonSize.Small}>
            <ArrowLeftBoldIcon />
          </Button>
        </Link>
      </Group>
      <Divider />
      {isEnabledTiers && currentTier && (
        <Group className="px-3 flex-nowrap justify-between">
          <StakeTier tier={currentTier} />
        </Group>
      )}
      <ExclusiveOffer />
    </Stack>
  );
};
