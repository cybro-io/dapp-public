import React from 'react';

import { getChainById } from '@lifi/data-types';

import { ButtonSelectChain, useSelectChainModal } from '@/features/SelectToken';
import { useStakeContext } from '@/features/Stake';
import { links } from '@/shared/lib';

export const StakeChain = () => {
  const { selectedChainId, form, stakeChains } = useStakeContext();

  const { openModal } = useSelectChainModal();

  const handleOpen = () => {
    openModal({
      chains: stakeChains,
      onSelectChain: (chainId) => {
        form.setFieldValue('chainId', chainId);
      },
      title: `Select stake network`,
    });
  };

  const chain = getChainById(selectedChainId);

  return (
    <ButtonSelectChain
      onClick={handleOpen}
      isDisabled={stakeChains.length < 2}
      chain={{ name: chain.name, icon: chain.logoURI ?? links.noImage }}
    />
  );
};
