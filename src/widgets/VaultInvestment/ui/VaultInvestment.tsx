import React, { useEffect } from 'react';

import { BigNumber } from 'bignumber.js';
import clsx from 'clsx';

import { getProviderByChainId } from '@/shared/lib';
import { createTokenContract, links } from '@/shared/lib';
import {
  AssetIcon,
  Dropdown,
  Group,
  Stack,
  Title,
  Typography,
  InfoButtonTooltip,
} from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';
import { useMyVaults } from '@/widgets/MyVaults';
import { myVaultsPeriods } from '@/widgets/MyVaults/lib/constants';

import { VaultInvestmentProps } from './types';
import styles from './VaultInvestment.module.scss';

export const VaultInvestment = ({
  address,
  vaultId,
  vaultAddress,
}: VaultInvestmentProps) => {
  const { period, setPeriod, vaults } = useMyVaults({
    walletAddress: address,
    fundId: vaultId,
    limit: 100,
  });

  const [vaultToken, setVaultToken] = React.useState('');
  const vault = vaults.find((vault) => vault.fund_id === vaultId);

  useEffect(() => {
    if (vaultAddress && vault) {
      const vaultContract = createTokenContract(
        vaultAddress,
        getProviderByChainId(vault.chain_id)!,
      );
      vaultContract.symbol().then(setVaultToken);
    }
  }, [vaultAddress, vault]);

  if (!vault) {
    return null;
  }

  const profitBN = new BigNumber(vault.profit ?? '');

  const shareCount = new BigNumber(vault.share_count ?? 0);

  const sharePrice =
    shareCount.isZero() || shareCount.isNaN()
      ? 0
      : new BigNumber(vault.equity_in_token ?? 0).div(shareCount).toNumber();

  return (
    <Stack
      className={clsx(
        'gap-5 pt-5 px-2.5 pb-2.5 rounded-[20px] flex-nowrap',
        styles.root,
      )}
    >
      <Stack className="gap-4 px-2.5">
        <Title order={4} className="text-white/60">
          My investment
        </Title>

        <Group className="justify-between gap-3">
          <Field title="Current Balance" className="flex-[2.7]">
            <Group className="md:flex-nowrap items-center gap-2">
              <AssetIcon
                src={vault.token_icon ?? links.noImage}
                alt={vault.token_name}
                width={20}
                height={20}
              />
              <Title order={3}>
                {formatUserMoney(vault.equity_in_token, 6, 6)}
              </Title>
              <Typography variant="caption" order={2} className="text-white/60">
                ≈ ${formatUserMoney(vault.equity_currency, 2)}
              </Typography>
            </Group>
          </Field>
          <Group className="justify-between md:flex-nowrap flex-[1.8] gap-3">
            <Field
              title={
                <InfoButtonTooltip
                  content={`1 ${vaultToken} ≈ ${formatUserMoney(sharePrice, 6, 6)} ${vault.token_name}`}
                >
                  <Typography
                    order={4}
                    variant="caption"
                    className="text-white/40"
                  >
                    Share count
                  </Typography>
                </InfoButtonTooltip>
              }
              className="flex-1"
            >
              <Group className="gap-1 flex-nowrap items-end">
                <Title order={4}>
                  {formatUserMoney(vault.share_count, 6, 6)}
                </Title>
                <Typography
                  variant="poppins"
                  order={3}
                  className="text-white/60"
                >
                  {vaultToken}
                </Typography>
              </Group>
            </Field>
          </Group>
        </Group>
      </Stack>

      {/*  Profit */}
      <Group className="flex-col md:flex-row bg-background-window rounded-[10px] py-5 pl-5 pr-8 gap-2 justify-center items-center w-full">
        <Stack className="gap-3 flex-1 self-start w-full">
          <Group className="gap-2">
            <Title order={4}>Your profit</Title>
            <Title order={4} className="text-white/60">
              in USD
            </Title>
          </Group>

          <Group className="justify-between gap-3 md:flex-nowrap">
            <Field direction="row" title="APY" className="flex-1 md:flex-[0.5]">
              <Typography variant="poppins" order={2} weight="bold">
                {vault.profitability ? `${vault.profitability}%` : 'n/a'}
              </Typography>
            </Field>

            <Field direction="row" title="Profit" className="flex-1">
              <Typography
                variant="poppins"
                order={2}
                weight="bold"
                className={
                  profitBN.isLessThan(0)
                    ? 'text-trustScore-red-100'
                    : 'text-trustScore-green-100'
                }
              >
                {profitBN.isNaN() && 'n/a'}

                {profitBN.isLessThan(0)
                  ? `-$${formatUserMoney(profitBN.abs().toNumber(), 6, 6)}`
                  : `+$${formatUserMoney(profitBN.abs().toNumber(), 6, 6)}`}
              </Typography>
            </Field>
          </Group>
        </Stack>
        <Dropdown
          buttonProps={{ className: 'w-[100px]' }}
          items={myVaultsPeriods}
          selectedKey={period}
          setSelected={setPeriod}
        />
      </Group>
    </Stack>
  );
};

const Field = ({
  title,
  children,
  direction = 'column',
  ...restProps
}: Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> & {
  title: React.ReactNode;
  direction?: 'column' | 'row';
}) => (
  <Stack
    {...restProps}
    className={clsx(
      restProps.className,
      'h-fit flex-nowrap',
      direction === 'row' ? '!flex-row !gap-2 items-center' : '!gap-1',
    )}
  >
    <Typography variant="caption" order={4} className="text-white/40">
      {title}
    </Typography>
    {['string', 'number'].includes(typeof children) ? (
      <Title order={5}>{children}</Title>
    ) : (
      children
    )}
  </Stack>
);
