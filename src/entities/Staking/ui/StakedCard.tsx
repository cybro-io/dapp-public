import React from 'react';

import { ChainId } from '@lifi/sdk';
import { BigNumber } from 'bignumber.js';
import clsx from 'clsx';
import dayjs from 'dayjs';

import { IStakedReport } from '@/entities/Staking';
import { ClaimRewardButton, UnstakeButton } from '@/features/Stake';
import { Group, Stack, Title, Typography } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

interface StakedCardProps {
  reward: string;
  report: IStakedReport;
  address: string;
  icon: React.ReactNode;
  tokenName: string;
  chainId: ChainId;
}

export const StakedCard = ({
  report,
  reward,
  address,
  icon,
  tokenName,
  chainId,
}: StakedCardProps) => {
  const isFinished = dayjs().isAfter(report.unlockTimestamp * 1000);

  const isCanReward = new BigNumber(reward).isGreaterThanOrEqualTo(0.000001);

  return (
    <Stack className="gap-2 py-6 lg:py-4 px-6 bg-background-card lg:bg-background-window rounded-[14px]">
      <Group className="justify-between">
        <Title order={5}>Staked {tokenName}</Title>
        {isFinished ? (
          <Typography variant="caption" order={4} className="text-white/40">
            Staking Finished
          </Typography>
        ) : (
          <Typography variant="caption" order={4}>
            <span className="text-white/60">End </span>
            {dayjs(report.unlockTimestamp * 1000).format('DD MMM YYYY')}
          </Typography>
        )}
      </Group>

      <Group className="gap-2">
        {icon}
        <Typography order={2} weight="bold">
          {formatUserMoney(report.balance)}
        </Typography>

        <Group
          className={clsx(
            'justify-center items-center px-2 py-1 rounded-md',
            'text-text-accent-logoYellow bg-trustScore-yellow-100/15',
          )}
        >
          <Typography order={3} weight="bold">
            +{formatUserMoney(reward)}
          </Typography>
        </Group>
      </Group>

      <Typography
        variant="caption"
        order={4}
        weight="medium"
        className="text-white/60 max-w-[319px]"
      >
        If you add more {tokenName} to this staking pool, the staking duration
        will reset, and the countdown will start from the new date.
      </Typography>

      {isFinished && (
        <UnstakeButton
          stakeAddress={address}
          tokenName={tokenName}
          chainId={chainId}
        />
      )}

      {!isFinished && tokenName !== 'CYBRO' && (
        <ClaimRewardButton
          stakeAddress={address}
          isDisabled={!isCanReward}
          tokenName={tokenName}
          chainId={chainId}
        />
      )}
    </Stack>
  );
};
