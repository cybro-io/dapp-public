import React from 'react';

import { Skeleton } from '@heroui/react';

import { Group, Stack, Title, Typography } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

import { useReferralStats } from '../model/useReferralStats';

import { ReferralLink } from './ReferralLink';

export const ReferralStats = () => {
  const { stats, isLoading } = useReferralStats();

  return (
    <Group className="bg-background-card rounded-[20px] p-2.5 pr-2.5 md:p-5 md:pl-[30px] w-full h-full justify-between gap-5">
      <Stack className="gap-6 px-4 md:px-0">
        <Stack className="gap-1.5">
          <Typography variant="caption" order={4} className="text-white/60">
            Referral balance
          </Typography>
          <Skeleton isLoaded={!isLoading}>
            <Title order={2}>
              ${formatUserMoney(stats?.total_rewards ?? 0)}
            </Title>
          </Skeleton>
        </Stack>

        <Group className="gap-14">
          <Stack className="gap-1.5">
            <Typography variant="caption" order={4} className="text-white/60">
              Referrals
            </Typography>
            <Skeleton isLoaded={!isLoading}>
              <Typography order={1}>{stats?.total_referrals ?? 0}</Typography>
            </Skeleton>
          </Stack>

          <Stack className="gap-1.5">
            <Typography variant="caption" order={4} className="text-white/60">
              Referrals’ deposit
            </Typography>
            <Skeleton isLoaded={!isLoading}>
              <Typography order={1}>
                ${formatUserMoney(stats?.total_deposits ?? 0)}
              </Typography>
            </Skeleton>
          </Stack>
        </Group>
      </Stack>

      {/* Card qr */}
      <ReferralLink />
    </Group>
  );
};
