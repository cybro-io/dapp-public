'use client';

import React from 'react';

import { Button } from '@nextui-org/button';
import { Code } from '@nextui-org/code';
import {
  Accordion,
  AccordionItem,
  Tooltip,
  Selection,
} from '@nextui-org/react';
import { LinkIcon } from '@nextui-org/shared-icons';
import { truncate } from 'lodash';

import { getExplorerProvider } from '@/entities/LiFi';
import { SafetyScoreDetailsV2 } from '@/entities/SafetyScoreDetails';
import InfoOutlinedIcon from '@/shared/assets/icons/info-outlined.svg';
import WarningIcon from '@/shared/assets/icons/warning-icon.svg';
import { ChainToExplorerUrl } from '@/shared/const';
import { links } from '@/shared/lib';
import { AssetIcon, Card, Chip, Loader, Text, TextView } from '@/shared/ui';
import { FundCalculator, FundCalculatorMobile } from '@/widgets/FundCalculator';
import { VaultCharts } from '@/widgets/VaultCharts';

import { useVaultPage } from '../model/useVaultPage';

interface VaultPageV2Props {
  vaultId: number;
}

export const VaultPageV2 = ({ vaultId }: VaultPageV2Props) => {
  const {
    vault,
    tokens,
    fees,
    isLoading,
    vaultTvl,
    cybroTvl,
    withDistribution,
  } = useVaultPage(vaultId);

  const [accordionKey, setAccordionKey] = React.useState<Selection>(
    new Set(['']),
  );

  const isAccordionOpen =
    accordionKey !== 'all' && accordionKey.has('description');

  if (isLoading || !vault) {
    return <VaultPageV2Loader />;
  }

  const isMoreLengthDesc = vault.description.length > 256;

  return (
    <div className="w-full h-full flex flex-col gap-4">
      {vault.alert_text && (
        <Code
          size="lg"
          color="danger"
          className="flex flex-wrap flex-row gap-2 items-center px-4 py-3 mb-2"
        >
          <WarningIcon className="size-5 text-white flex-shrink-0" />
          <Text textView={TextView.P2}>{vault.alert_text}</Text>
        </Code>
      )}
      <div className="flex flex-row justify-center md:justify-between items-center flex-wrap gap-2">
        <div className="flex flex-wrap flex-row items-center gap-1.5 justify-center md:justify-start text-center md:text-left">
          {tokens.map((token) => (
            <AssetIcon
              key={token.name}
              alt={token.name}
              src={token.icon ?? links.noImage}
              height={48}
              width={48}
            />
          ))}

          <Text textView={TextView.H3}>{vault.name}</Text>
          {vault.badges.map((badge) => (
            <Chip key={badge.name}>{badge.name}</Chip>
          ))}
        </div>
        <Button
          title="View contract vault"
          isIconOnly
          as="a"
          target="_blank"
          href={`${getExplorerProvider(vault.chain_id)}/address/${vault.address}`}
        >
          <LinkIcon />
        </Button>
      </div>

      <div className="flex flex-col fund-order:flex-row gap-4 flex-wrap">
        <section className="flex flex-col gap-4 flex-1">
          {/* Information vault */}
          <Card>
            <Card.Header className="!p-3 md:p-6">
              <div className="flex flex-row flex-wrap justify-around gap-y-3">
                <VaultInfoField title="APY" value={`${vault.apy}%`} />

                <VaultInfoField
                  title="TVL"
                  value={`$${vaultTvl}`}
                  tooltipContent={
                    <div className="flex flex-col gap-2 p-3">
                      <Text textView={TextView.C3}>Total TVL: ${vaultTvl}</Text>
                      <Text textView={TextView.C3}>Cybro TVL: ${cybroTvl}</Text>
                    </div>
                  }
                />

                <VaultInfoField title="Provider" value={vault.provider.name} />

                {/*<div className="grid grid-rows-3 gap-4 min-w-[143px]">*/}
                {/*  <VaultInfoField*/}
                {/*    title="Deposit Fee"*/}
                {/*    value={`${fees.deposit}%`}*/}
                {/*    tooltipContent={vaultDescriptions.fee.deposit}*/}
                {/*  />*/}
                {/*  <VaultInfoField*/}
                {/*    title="Withdrawal Fee"*/}
                {/*    value={`${fees.withdrawal}%`}*/}
                {/*    tooltipContent={vaultDescriptions.fee.withdrawal}*/}
                {/*  />*/}
                {/*  <VaultInfoField*/}
                {/*    title="Profit Fee"*/}
                {/*    value={`${fees.profit}%`}*/}
                {/*    tooltipContent={vaultDescriptions.fee.profit}*/}
                {/*  />*/}
                {/*</div>*/}
              </div>
            </Card.Header>
          </Card>

          <Accordion
            className="bg-background-chips/50 rounded-lg px-6"
            selectedKeys={isMoreLengthDesc ? accordionKey : ['description']}
            onSelectionChange={setAccordionKey}
          >
            <AccordionItem
              hideIndicator={!isMoreLengthDesc}
              key="description"
              aria-label="desc"
              title={
                <Text textView={TextView.H4} className="mb-2">
                  Vault description
                </Text>
              }
              subtitle={
                <Text textView={TextView.C4} className="mb-2">
                  {isAccordionOpen
                    ? vault.description
                    : truncate(vault.description, { length: 256 })}
                </Text>
              }
            ></AccordionItem>
          </Accordion>

          {/*<section className="flex flex-row gap-2 flex-wrap">*/}
          {/*  <Card className="w-auto min-w-[327px] flex-1 !h-auto">*/}
          {/*    <Card.Header className="flex flex-col gap-3 justify-between">*/}
          {/*      <Text textView={TextView.H5}>My investments in this fund</Text>*/}
          {/*      <div>*/}
          {/*        <div className="flex flex-row justify-between">*/}
          {/*          <Text textView={TextView.C4} className="!text-white/60">*/}
          {/*            Share count:*/}
          {/*          </Text>*/}
          {/*          <Text textView={TextView.C4}>500</Text>*/}
          {/*        </div>*/}
          {/*        <div className="flex flex-row justify-between">*/}
          {/*          <Text textView={TextView.C4} className="!text-white/60">*/}
          {/*            Current Equity:*/}
          {/*          </Text>*/}
          {/*          <Text textView={TextView.C4}>500</Text>*/}
          {/*        </div>*/}
          {/*        <div className="flex flex-row justify-between">*/}
          {/*          <Text textView={TextView.C4} className="!text-white/60">*/}
          {/*            Current Equity (USD):*/}
          {/*          </Text>*/}
          {/*          <Text textView={TextView.C4}>500</Text>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </Card.Header>*/}
          {/*  </Card>*/}
          {/*  <Card className="w-auto min-w-[327px] !h-auto flex-1">*/}
          {/*    <Card.Header className="flex flex-col gap-3">*/}
          {/*      <div className="flex flex-row justify-between items-center flex-wrap gap-y-2">*/}
          {/*        <Text textView={TextView.H5} className="mb-2 flex-1">*/}
          {/*          Profit Loss*/}
          {/*        </Text>*/}
          {/*        <div className="flex flex-row gap-0.5">*/}
          {/*          <Select*/}
          {/*            placeholder="Asset"*/}
          {/*            size="sm"*/}
          {/*            className="min-w-[76px]"*/}
          {/*          >*/}
          {/*            <Select.Item key={'usd'}>USD</Select.Item>*/}
          {/*          </Select>*/}
          {/*          <Select*/}
          {/*            placeholder="Timeframe"*/}
          {/*            size="sm"*/}
          {/*            className="min-w-[106px]"*/}
          {/*          >*/}
          {/*            <Select.Item key={'zal'}>Month</Select.Item>*/}
          {/*          </Select>*/}
          {/*        </div>*/}
          {/*      </div>*/}

          {/*      <div>*/}
          {/*        <div className="flex flex-row justify-between">*/}
          {/*          <Text textView={TextView.C4} className="!text-white/60">*/}
          {/*            APY (Period):*/}
          {/*          </Text>*/}
          {/*          <Text textView={TextView.C4}>+5.2%</Text>*/}
          {/*        </div>*/}
          {/*        <div className="flex flex-row justify-between">*/}
          {/*          <Text textView={TextView.C4} className="!text-white/60">*/}
          {/*            Profit:*/}
          {/*          </Text>*/}
          {/*          <Text textView={TextView.C4}>+107</Text>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    </Card.Header>*/}
          {/*  </Card>*/}
          {/*</section>*/}

          <VaultCharts withDistribution={withDistribution} vaultId={vaultId} />

          <SafetyScoreDetailsV2
            vaultId={vault.id}
            trustScore={vault.trust_score}
            auditor={vault.auditors[0]}
          />

          {/*<Card>*/}
          {/*  <Card.Header>*/}
          {/*    <Transactions />*/}
          {/*  </Card.Header>*/}
          {/*</Card>*/}

          <Card>
            <Card.Header className="!p-3 md:p-6">
              <div className="flex flex-row flex-wrap justify-around gap-y-3">
                <VaultInfoField
                  title="Deposit Fee"
                  value={`${fees.deposit}%`}
                />
                <VaultInfoField
                  title="Withdrawal Fee"
                  value={`${fees.withdrawal}%`}
                />
                <VaultInfoField title="Profit Fee" value={`${fees.profit}%`} />
              </div>
            </Card.Header>
          </Card>
        </section>
        <FundCalculatorMobile
          vault={vault}
          className="block fund-order:hidden sticky bottom-5 flex-1"
        />

        <FundCalculator vault={vault} className="hidden fund-order:flex" />
      </div>
    </div>
  );
};

interface VaultInfoFieldProps {
  title: React.ReactNode;
  value: React.ReactNode;
  tooltipContent?: React.ReactNode;
}

const VaultInfoField = ({
  value,
  title,
  tooltipContent,
}: VaultInfoFieldProps) => {
  const [isOpen, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-1 items-center">
      <div className="flex flex-row gap-1 items-center justify-center">
        <Text textView={TextView.C4} className="!text-white/60">
          {title}
        </Text>
        {tooltipContent && (
          <Tooltip
            classNames={{
              content: 'whitespace-pre-wrap max-w-[500px] p-4',
            }}
            showArrow
            content={tooltipContent}
            isOpen={isOpen}
            onOpenChange={(value) => !value && setOpen(value)}
          >
            <Button
              radius="full"
              className="!size-5 !p-0 !min-w-0"
              isIconOnly
              variant="shadow"
              onClick={() => setOpen((prevState) => !prevState)}
            >
              <InfoOutlinedIcon />
            </Button>
          </Tooltip>
        )}
      </div>
      <Text textView={TextView.C2}>{value}</Text>
    </div>
  );
};

const VaultPageV2Loader = () => {
  return (
    <div className="h-[300px] flex justify-center items-center">
      <Loader />
    </div>
  );
};

export default VaultPageV2;
