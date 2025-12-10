import React from 'react';

import { Skeleton } from '@heroui/react';

import { useBridgeContext } from '@/features/BridgeForm';
import { ButtonSelectChain, useSelectChainModal } from '@/features/SelectToken';
import { Group, Stack, SwapButton, Typography } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

export const BridgeDirection = () => {
  const {
    balance,
    isLoadingBalance,
    address,
    form,
    bridgeChains,
    sourceChain,
    destinationChain,
  } = useBridgeContext();

  const { openModal } = useSelectChainModal();

  // const handleOpen = (fieldValue: 'destinationChain' | 'sourceChain') => {
  //   const reverseName =
  //     fieldValue === 'destinationChain' ? 'sourceChain' : 'destinationChain';
  //
  //   openModal({
  //     chains: bridgeChains.filter(
  //       (chain) => chain.id !== form.values[fieldValue],
  //     ),
  //     onSelectChain: (chainId) => {
  //       if (form.values[reverseName] === chainId) {
  //         handleSwap();
  //       } else {
  //         form.setFieldValue(fieldValue, chainId);
  //       }
  //     },
  //     title: `Select ${fieldValue === 'destinationChain' ? 'destination' : 'source'} network`,
  //   });
  // };

  const handleSwap = () => {
    const destinationId = form.values['destinationChain'];
    const sourceId = form.values['sourceChain'];

    form.setFieldValue('destinationChain', sourceId);
    form.setFieldValue('sourceChain', destinationId);
  };

  return (
    <Stack className="py-2.5 gap-2 bg-background-chips w-full rounded-[20px]">
      {address && (
        <Group className="px-4 gap-1">
          <Typography variant="caption" order={4} className="text-white/70">
            Available&nbsp;
          </Typography>
          <Skeleton isLoaded={!isLoadingBalance}>
            <Typography variant="caption" order={4}>
              {formatUserMoney(balance)} CYBRO
            </Typography>
          </Skeleton>
        </Group>
      )}

      <div className="px-1.5 w-full">
        <ButtonSelectChain
          chain={{
            icon: sourceChain?.logoUrl ?? '',
            name: sourceChain?.name ?? '',
          }}
          label="Source network"
          // onClick={() => handleOpen('sourceChain')}
          isDisabled={true}
        />
      </div>

      <SwapButton classNameSide="contrast-[0.6]" onClick={handleSwap} />

      <div className="px-1.5 w-full">
        <ButtonSelectChain
          chain={{
            icon: destinationChain?.logoUrl ?? '',
            name: destinationChain?.name ?? '',
          }}
          label="Destination network"
          // onClick={() => handleOpen('destinationChain')}
          isDisabled={true}
        />
      </div>
    </Stack>
  );
};
