'use client';

import React from 'react';

import NiceModal from '@ebay/nice-modal-react';
import { Spinner } from '@heroui/react';

import TickCircle from '@/shared/assets/icons/tick-circle.svg';
import { AssetIcon, ExchangeDivider, Modal, Text, TextView } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

interface WaitForCompleteModalProps {
  asset1?: React.ReactNode;
  asset2?: React.ReactNode;
  step: number;
  statuses: string[];
}

export const WaitForCompleteModal = NiceModal.create<WaitForCompleteModalProps>(
  ({ statuses, asset2, asset1, step }) => {
    return (
      <Modal
        isDismissable={false}
        hideCloseButton={true}
        classNames={{ base: 'w-[375px]' }}
      >
        <Modal.Header>Waiting for completion</Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-4 justify-center items-center rounded-[22px] bg-background-window p-4">
            {asset1}

            {asset2 && (
              <React.Fragment>
                <ExchangeDivider />
                {asset2}
              </React.Fragment>
            )}

            <hr className="h-divider w-full border-dashed border-t-1 border-stroke-tableBorder" />

            <div className="flex flex-col flex-1 w-full gap-1">
              <Text textView={TextView.C1}>transaction status</Text>
              <div className="flex flex-col">
                {statuses.map((status, index) => (
                  <div
                    key={status}
                    className="inline-flex gap-1 items-center px-0.5 py-1 odd:bg-background-tableRow/60"
                  >
                    <Text textView={TextView.C4} className="flex-1 opacity-60">
                      {status}
                    </Text>
                    {index === step && (
                      <Spinner
                        color="warning"
                        classNames={{ wrapper: '!size-3' }}
                      />
                    )}
                    {index < step && <TickCircle />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  },
);

type AssetWaitForCompleteProps = {
  label: React.ReactNode;
  amount: string | number;
  assetIconUrl: string;
  assetName: string;
  chain?: { chainIconUrl: string; chainName: string };
};

export const AssetWaitForComplete = ({
  label,
  amount,
  assetIconUrl,
  assetName,
  chain,
}: AssetWaitForCompleteProps) => (
  <div className="flex flex-col flex-1 w-full gap-[5px]">
    <Text textView={TextView.C4} className="opacity-60">
      {label}
    </Text>
    <div className="inline-flex gap-1 items-end">
      <Text textView={TextView.BU1}>{formatUserMoney(amount)}</Text>
    </div>
    <div className="flex flex-row gap-[9px] items-center">
      <AssetIcon
        src={assetIconUrl}
        width={24}
        height={24}
        alt={assetName}
        subImage={
          chain
            ? {
                src: chain.chainIconUrl,
                alt: chain.chainName,
                width: 10,
                height: 10,
              }
            : undefined
        }
      />
      <div className="flex flex-col gap-0.5">
        <Text textView={TextView.C2}>{assetName}</Text>
        {chain && (
          <Text textView={TextView.C4} className="opacity-40">
            On {chain.chainName}
          </Text>
        )}
      </div>
    </div>
  </div>
);
