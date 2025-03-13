'use client';

import React from 'react';

import { Button } from '@nextui-org/button';
import { Code } from '@nextui-org/code';
import { Link, LinkIcon } from '@nextui-org/react';
import { capitalize } from '@nextui-org/shared-utils';
import NextLink from 'next/link';

import { getExplorerProvider } from '@/entities/LiFi';
import { SafetyScoreDetails } from '@/entities/SafetyScoreDetails';
import WarningIcon from '@/shared/assets/icons/warning-icon.svg';
import { links, useWeb3ModalAccount } from '@/shared/lib';
import {
  AssetIcon,
  Button as ButtonCybro,
  Chip,
  ChipViewType,
  Group,
  InfoButtonTooltip,
  OutlinedBox,
  Stack,
  Title,
  TrustScore,
  TrustScoreViewType,
  Typography,
} from '@/shared/ui';
import { FundCalculator, FundCalculatorMobile } from '@/widgets/FundCalculator';
import { Transactions } from '@/widgets/Transactions';
import { VaultCharts } from '@/widgets/VaultCharts';
import { VaultInvestment } from '@/widgets/VaultInvestment';

import { useVaultPage } from '../model/useVaultPage';

import { VaultInfoField } from './VaultInfoField';
import { VaultPageV2Loader } from './VaultPageV2Loader';

interface VaultPageV2Props {
  vaultId: number;
}

const isOrbitLending = (vaultId: number) => [7, 8, 9].includes(vaultId);

const txIds = {
  '7': '0x2e7eebe00d762ef29fe599be615691c815874b9de11f4629c532cfec7350b2cb',
  '8': '0x6027fd22ad076fe9f7745c9cea50d49ce7a498f083acdb0ce5dee94ea9e5bfeb',
  '9': '0x556bde072daddf5b06248486f6cabbf1e7a027357f8f8f36a1714320fdf97c0e',
} as Record<string, string>;

export const VaultPageV2 = ({ vaultId }: VaultPageV2Props) => {
  const {
    vault,
    tokens,
    fees,
    isLoading,
    vaultTvl,
    cybroTvl,
    withDistribution,
    vaultParams,
  } = useVaultPage(vaultId);

  const { address } = useWeb3ModalAccount();

  if (isLoading || !vault) {
    return <VaultPageV2Loader />;
  }

  return (
    <div className="w-full h-full flex flex-col gap-5 md:gap-4">
      {!isOrbitLending(vaultId) && vault.alert_text && (
        <Code
          size="lg"
          color="danger"
          className="flex flex-wrap flex-row gap-2 items-center px-4 py-3 mb-2"
        >
          <WarningIcon className="size-5 text-white flex-shrink-0" />
          <Typography variant="poppins" order={2} className="whitespace-normal">
            {vault.alert_text}
          </Typography>
        </Code>
      )}
      <div className="flex flex-row justify-center md:justify-between items-center flex-wrap gap-2">
        <div className="flex flex-wrap flex-row items-center gap-4 justify-center md:justify-start text-center md:text-left">
          <div className="order-last md:order-none">
            <TrustScore
              value={vault.trust_score}
              viewType={TrustScoreViewType.SmallSecondary}
            />
          </div>

          <Group
            className="relative"
            style={{ width: `${48 + (tokens.length - 1) * 32}px` }}
          >
            {tokens.map((token, index) => (
              <AssetIcon
                key={token.name}
                alt={token.name}
                src={token.icon ?? links.noImage}
                height={48}
                width={48}
                skeletonProps={{
                  className: index !== 0 ? 'absolute' : '',
                  style: { left: `${index * 32}px` },
                }}
              />
            ))}
          </Group>

          <Title order={3} uppercase>
            {vault.name}
          </Title>
        </div>
        <Button
          title="View contract vault"
          as="a"
          target="_blank"
          className="bg-background-tableRow"
          href={`${getExplorerProvider(vault.chain_id)}/address/${vault.address}`}
        >
          Vault contract
          <LinkIcon />
        </Button>
      </div>

      {isOrbitLending(vaultId) ? (
        <React.Fragment>
          <Code
            size="lg"
            color="danger"
            className="mx-auto flex flex-wrap w-fit flex-row gap-2 items-center px-4 py-3 mb-2"
          >
            <WarningIcon className="size-5 text-white flex-shrink-0" />
            <Typography
              variant="poppins"
              order={2}
              className="whitespace-normal"
            >
              This Vault has been deprecated, and all deposits have been{' '}
              <Link
                href={`${getExplorerProvider(vault.chain_id)}/tx/${txIds[vaultId.toString()]}`}
                target="_blank"
              >
                refunded.
              </Link>
              <br />
              If you previously had a deposit in this Vault, please check your
              wallet.
              <br />
              For any issues or concerns, feel free to contact us at{' '}
              <Link href="mailto:support@cybro.io">support@cybro.io</Link>
              <br />
            </Typography>
          </Code>

          <NextLink href="/one-click">
            <ButtonCybro className="w-fit mx-auto">
              Explore other opportunities
            </ButtonCybro>
          </NextLink>
        </React.Fragment>
      ) : (
        <div className="flex flex-col fund-order:flex-row gap-4 flex-wrap">
          <section className="flex flex-col gap-9 flex-1 w-full">
            {address && (
              <VaultInvestment
                address={address}
                vaultId={vaultId}
                vaultAddress={vault.address}
              />
            )}
            <OutlinedBox>
              <Group className="p-5">
                <VaultInfoField
                  title="APY"
                  value={
                    <Typography variant="poppins" order={1}>
                      {vault.apy}%
                    </Typography>
                  }
                />

                <VaultInfoField
                  title={
                    <InfoButtonTooltip
                      content={
                        <Stack className="gap-1">
                          <span>Total TVL: ${vaultTvl}</span>
                          <span>Cybro TVL: ${cybroTvl}</span>
                        </Stack>
                      }
                    >
                      <Typography
                        variant="caption"
                        order={4}
                        className="text-white/40"
                      >
                        TVL
                      </Typography>
                    </InfoButtonTooltip>
                  }
                  value={
                    <Typography variant="poppins" order={1}>
                      ${vaultTvl}
                    </Typography>
                  }
                />

                <VaultInfoField
                  title="Intention"
                  value={
                    <Chip viewType={ChipViewType.Blue}>
                      {capitalize(vaultParams?.intention ?? '')}
                    </Chip>
                  }
                />
              </Group>
              <OutlinedBox.Divider />
              <Group className="p-5 gap-3">
                <Stack className="gap-3 flex-1">
                  <VaultInfoField
                    title="Chain"
                    value={
                      <Group className="gap-1.5">
                        <AssetIcon
                          src={vault.icon}
                          alt={vault.chain}
                          width={16}
                          height={16}
                        />
                        <Typography variant="poppins" order={3}>
                          {vault.chain}
                        </Typography>
                      </Group>
                    }
                  />
                  <VaultInfoField
                    title="Token"
                    value={
                      <Stack className="gap-1">
                        {tokens.map((token) => (
                          <Group className="gap-1.5" key={token.name}>
                            <AssetIcon
                              key={token.name}
                              alt={token.name}
                              src={token.icon ?? links.noImage}
                              height={16}
                              width={16}
                            />
                            <Typography variant="poppins" order={3}>
                              {token.name}
                            </Typography>
                          </Group>
                        ))}
                      </Stack>
                    }
                  />
                </Stack>
                <Stack className="gap-3 flex-1">
                  <VaultInfoField
                    title="Management"
                    value={capitalize(vaultParams?.manager ?? '')}
                  />
                  <VaultInfoField
                    title="Rebalancing"
                    value={capitalize(vaultParams?.management_type ?? '')}
                  />
                </Stack>
                <Stack className="gap-3 flex-1">
                  <VaultInfoField
                    title="Provider"
                    value={vault.provider.name}
                  />
                </Stack>
              </Group>
            </OutlinedBox>

            <Stack className="gap-4">
              <Title order={4}>Vault Description</Title>
              <Typography
                order={2}
                variant="poppins"
                className="text-white/80"
                weight="regular"
              >
                {vault.description}
              </Typography>
            </Stack>

            <VaultCharts
              withDistribution={withDistribution}
              vaultId={vaultId}
              vaultAddress={vault.address}
              chainId={vault.chain_id}
            />

            <SafetyScoreDetails
              vaultId={vault.id}
              trustScore={vault.trust_score}
              auditor={vault.auditors[0]}
            />

            <OutlinedBox>
              <Group className="p-5 gap-3">
                <VaultInfoField
                  title="Deposit Fee"
                  value={`${fees.deposit}%`}
                />
                <VaultInfoField
                  title="Withdrawal Fee"
                  value={`${fees.withdrawal}%`}
                />
                <VaultInfoField title="Profit Fee" value={`${fees.profit}%`} />

                <Typography
                  variant="caption"
                  order={4}
                  className="text-white/40 flex-1 basis-[238px] max-w-max md:max-w-[238px]"
                >
                  No hidden fees or additional charges. Ensuring complete
                  transparency in all transactions on our platform.
                </Typography>
              </Group>
            </OutlinedBox>

            {address && (
              <Transactions walletAddress={address} vaultName={vault.name} />
            )}
          </section>
          <FundCalculatorMobile
            vault={vault}
            className="block fund-order:hidden sticky bottom-5 flex-1"
          />

          <FundCalculator vault={vault} className="hidden fund-order:flex" />
        </div>
      )}
    </div>
  );
};

export default VaultPageV2;
