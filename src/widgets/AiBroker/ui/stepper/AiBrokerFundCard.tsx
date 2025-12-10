import React from 'react';

import { Divider } from '@heroui/react';
import { capitalize } from '@heroui/shared-utils';
import { BigNumber } from 'bignumber.js';

import { Fund } from '@/shared/types';
import {
  AssetIcon,
  Group,
  Stack,
  Title,
  TrustScore,
  TrustScoreViewType,
  Typography,
} from '@/shared/ui';
import { shortNumber } from '@/shared/utils';

interface AiBrokerFundCardProps {
  fund: Fund;
  isDisabled?: boolean;
  onSelectFund?: (fund: Fund) => void;
}

export const AiBrokerFundCard = ({
  fund,
  onSelectFund,
  isDisabled = false,
}: AiBrokerFundCardProps) => {
  const fields = [
    {
      title: 'APY',
      value: `${new BigNumber(fund.apy).multipliedBy(100).toFixed(2)}%`,
    },
    { title: 'TVL', value: `$${shortNumber(fund.tvl)}` },
    { title: 'Chain', value: capitalize(fund.chain_name) },
    {
      title: 'Trust',
      value: (
        <TrustScore
          viewType={TrustScoreViewType.Small}
          value={fund.trust_score}
        />
      ),
    },
  ];

  return (
    <Stack
      onClick={() => onSelectFund?.(fund)}
      data-disabled={isDisabled}
      className="w-full max-w-[518px] rounded-[14px] p-3 gap-2 flex-nowrap bg-black border border-solid border-transparent data-[disabled=false]:cursor-pointer data-[disabled=false]:hover:border-text-accent-logoYellow"
    >
      <Group className="justify-between gap-y-1">
        <Title order={5} className="md:order-first order-last">
          {fund.name}
        </Title>
        {fund.tokens.map((token) => (
          <AssetIcon
            key={token.id}
            src={token.icon}
            alt={token.name}
            width={24}
            height={24}
          />
        ))}
      </Group>
      <Divider />
      <Stack className="md:flex-row justify-between pr-0 md:pr-6 gap-y-1">
        {fields.map((field) => (
          <FundField key={field.title} title={field.title}>
            {field.value}
          </FundField>
        ))}
      </Stack>
    </Stack>
  );
};

interface FundFieldProps extends React.PropsWithChildren {
  title: string;
}

const FundField = ({ title, children }: FundFieldProps) => {
  return (
    <Group className="md:flex-col justify-between">
      <Typography variant="caption" order={4} className="text-white/60">
        {title}
      </Typography>
      <Typography variant="poppins" order={3}>
        {children}
      </Typography>
    </Group>
  );
};
