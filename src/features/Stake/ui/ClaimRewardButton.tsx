import React from 'react';

import { triggerToast } from '@/shared/lib';
import { Button, ButtonSize, ButtonView, ToastType } from '@/shared/ui';

import { useClaimReward } from '../model/useClaimReward';

interface ClaimRewardButtonProps {
  stakeAddress: string;
}

export const ClaimRewardButton = ({ stakeAddress }: ClaimRewardButtonProps) => {
  const { claimRewardMutation, isPending } = useClaimReward();

  const handleClaimReward = () => {
    claimRewardMutation(stakeAddress)
      .then(() => {
        triggerToast({
          message: 'Successfully claimed Locked CYBRO',
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
      disabled={isPending}
      isLoading={isPending}
      onClick={handleClaimReward}
    >
      Claim rewards
    </Button>
  );
};
