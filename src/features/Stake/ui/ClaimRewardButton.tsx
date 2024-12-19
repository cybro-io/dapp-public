import React from 'react';

import { ChainId } from '@lifi/types';

import { triggerToast, useShouldSwitchNetwork } from '@/shared/lib';
import { Button, ButtonSize, ButtonView, ToastType } from '@/shared/ui';

import { useClaimReward } from '../model/useClaimReward';

interface ClaimRewardButtonProps {
  stakeAddress: string;
  isDisabled?: boolean;
  tokenName: string;
}

export const ClaimRewardButton = ({
  stakeAddress,
  isDisabled,
  tokenName,
}: ClaimRewardButtonProps) => {
  const { claimRewardMutation, isPending } = useClaimReward();

  const { isNeedSwitchNetwork, switchNetwork } = useShouldSwitchNetwork(
    ChainId.BLS,
  );

  const handleClaimReward = () => {
    if (isNeedSwitchNetwork) {
      switchNetwork();
      return;
    }

    claimRewardMutation(stakeAddress)
      .then(() => {
        triggerToast({
          message: `Successfully claimed ${tokenName}`,
          description: 'Check your updated Balance.',
        });
      })
      .catch((_error) => {
        triggerToast({
          message: `Something went wrong`,
          description:
            'We were unable to complete the current operation. Try again or connect feedback.',
          type: ToastType.Error,
        });
      });
  };

  return (
    <Button
      type="button"
      size={ButtonSize.Small}
      view={ButtonView.Secondary}
      className="w-full lg:w-fit"
      disabled={isPending || isDisabled}
      isLoading={isPending}
      onClick={handleClaimReward}
    >
      {isNeedSwitchNetwork ? 'Switch network' : 'Claim rewards'}
    </Button>
  );
};
