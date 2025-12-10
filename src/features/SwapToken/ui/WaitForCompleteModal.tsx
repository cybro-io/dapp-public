import React from 'react';

import NiceModal from '@ebay/nice-modal-react';
import { getChainById } from '@lifi/data-types';
import { utils } from 'ethers';

import { useZapIn, useZapInCalculate } from '@/features/ZapInToken';
import TickCircle from '@/shared/assets/icons/tick-circle.svg';
import { links } from '@/shared/lib';
import {
  AssetIcon,
  ExchangeDivider,
  Group,
  Modal,
  Stack,
  Text,
  TextView,
  Typography,
} from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

export const WaitForCompleteModal = NiceModal.create(() => {
  const currentModal = NiceModal.useModal();

  const { isLoading } = useZapIn();
  const { result } = useZapInCalculate();

  React.useEffect(() => {
    if (!isLoading) {
      currentModal.remove();
    }
  }, [isLoading]);

  if (!result) {
    return null;
  }

  const { toToken, fromToken, toAmount, fromAmount } = result;
  const toChain = getChainById(toToken.chainId);
  const fromChain = getChainById(fromToken.chainId);

  return (
    <Modal
      isDismissable={false}
      hideCloseButton={true}
      classNames={{ base: 'w-[375px]' }}
    >
      <Modal.Header>Waiting for completion</Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-4 justify-center items-center rounded-[22px] bg-background-window p-4">
          <TokenCard
            direction="You send"
            amount={utils.formatUnits(fromAmount, fromToken.decimals)}
            tokenIcon={fromToken.logoURI ?? links.noImage}
            chainIcon={fromChain.logoURI ?? links.noImage}
            chainName={fromChain.name}
            tokenName={fromToken.symbol}
          />
          <ExchangeDivider />
          <TokenCard
            direction="You receive"
            amount={utils.formatUnits(toAmount, toToken.decimals)}
            tokenIcon={toToken.logoURI ?? links.noImage}
            chainIcon={toChain.logoURI ?? links.noImage}
            chainName={toChain.name}
            tokenName={toToken.symbol}
          />

          <hr className="h-divider w-full border-dashed border-t-1 border-stroke-tableBorder" />

          <div className="flex flex-col flex-1 w-full gap-1">
            <Text textView={TextView.C1}>transaction status</Text>
            <div className="flex flex-col">
              <div className="inline-flex gap-1 items-center px-0.5 py-1 odd:bg-background-tableRow/60">
                <Text textView={TextView.C4} className="flex-1 opacity-60">
                  Swap processing...
                </Text>
                <TickCircle />
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
});

type TokenCardProps = {
  direction: React.ReactNode;
  amount: string;
  tokenIcon: string;
  chainIcon: string;
  chainName: string;
  tokenName: string;
};

const TokenCard = ({
  direction,
  amount,
  tokenIcon,
  chainIcon,
  chainName,
  tokenName,
}: TokenCardProps) => (
  <Stack className="flex-1 w-full gap-[5px]">
    <Typography variant="caption" order={4} className="text-white/60">
      {direction}
    </Typography>
    <Group className="gap-1 items-end">
      <Typography order={1}>{formatUserMoney(amount)}</Typography>
    </Group>
    <Group className="flex-nowrap gap-[9px] items-center">
      <AssetIcon
        src={tokenIcon}
        alt={tokenName}
        width={32}
        height={32}
        subImage={{ src: chainIcon, alt: chainName, width: 14, height: 14 }}
      />

      <Stack>
        <Text textView={TextView.C2}>{tokenName}</Text>
        <Text textView={TextView.C4} className="opacity-40">
          On {chainName}
        </Text>
      </Stack>
    </Group>
  </Stack>
);
