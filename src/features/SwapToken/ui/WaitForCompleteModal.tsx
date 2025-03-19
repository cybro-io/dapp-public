import React from 'react';

import NiceModal from '@ebay/nice-modal-react';

import { useSwap, getSwapStatus, SwapStatus } from '@/features/SwapToken';
import TickCircle from '@/shared/assets/icons/tick-circle.svg';
import { ExchangeDivider, Modal, Text, TextView } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

export const WaitForCompleteModal = NiceModal.create(() => {
  const currentModal = NiceModal.useModal();

  const { swapInfo, isLoadingSwap } = useSwap();

  React.useEffect(() => {
    if (!isLoadingSwap) {
      currentModal.remove();
    }
  }, [isLoadingSwap]);

  if (!swapInfo) {
    return null;
  }

  const { tokenAmountIn, tokenAmountOut, swapStatus } = swapInfo;
  const tokenIn = tokenAmountIn.token;
  const tokenOut = tokenAmountOut.token;

  return (
    <Modal
      classNames={{ base: 'w-[375px]' }}
      onClose={() => currentModal.remove()}
    >
      <Modal.Header>Waiting for completion</Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-4 justify-center items-center rounded-[22px] bg-background-window p-4">
          <TokenCard
            direction="You send"
            amount={tokenAmountIn.toSignificant()}
            tokenIcon={String(tokenIn.icons?.small)}
            chainIcon={String(tokenIn.chain?.icons?.small)}
            chainName={String(tokenIn.chain?.name)}
            tokenName={String(tokenIn.symbol)}
          />
          <ExchangeDivider />
          <TokenCard
            direction="You receive"
            amount={tokenAmountOut.toSignificant()}
            tokenIcon={String(tokenOut.icons?.small)}
            chainIcon={String(tokenOut.chain?.icons?.small)}
            chainName={String(tokenOut.chain?.name)}
            tokenName={String(tokenOut.symbol)}
          />

          <hr className="h-divider w-full border-dashed border-t-1 border-stroke-tableBorder" />

          <div className="flex flex-col flex-1 w-full gap-1">
            <Text textView={TextView.C1}>transaction status</Text>
            <div className="flex flex-col">
              {Object.values(SwapStatus)
                .filter((value) => typeof value === 'number')
                .map((value, index) => (
                  <div
                    key={value}
                    className="inline-flex gap-1 items-center px-0.5 py-1 odd:bg-background-tableRow/60"
                  >
                    <Text textView={TextView.C4} className="flex-1 opacity-60">
                      {getSwapStatus(value as SwapStatus, tokenIn, tokenOut)}
                    </Text>
                    {typeof swapStatus === 'number' && swapStatus > index && (
                      <TickCircle />
                    )}
                  </div>
                ))}
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
  <div className="flex flex-col flex-1 w-full gap-[5px]">
    <Text textView={TextView.C4} className="opacity-60">
      {direction}
    </Text>
    <div className="inline-flex gap-1 items-end">
      <Text textView={TextView.BU1}>{formatUserMoney(amount)}</Text>
    </div>
    <div className="flex flex-row gap-[9px] items-center">
      <img src={tokenIcon} className="size-6" alt={tokenName} />
      <div>
        <Text textView={TextView.C2}>{tokenName}</Text>
        <div className="flex flex-row gap-[5px] items-center">
          <img src={chainIcon} className="size-[14px]" alt={chainName} />
          <Text textView={TextView.C4} className="opacity-40">
            On {chainName}
          </Text>
        </div>
      </div>
    </div>
  </div>
);
