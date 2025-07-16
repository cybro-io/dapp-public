import React from 'react';

import { ChainId } from '@lifi/sdk';

import { AnalyticsEvent, track } from '@/shared/analytics';
import {
  isErrorUserRejected,
  triggerToast,
  useShouldSwitchNetwork,
} from '@/shared/lib';
import { Button, ButtonSize, ButtonView, ToastType } from '@/shared/ui';

import { useClaimReward } from '../model/useClaimReward';

interface ClaimRewardButtonProps {
  stakeAddress: string;
  isDisabled?: boolean;
  tokenName: string;
  chainId: ChainId;
}

export const ClaimRewardButton = ({
  stakeAddress,
  isDisabled,
  tokenName,
  chainId,
}: ClaimRewardButtonProps) => {
  const { claimRewardMutation, isPending } = useClaimReward();

  const { isNeedSwitchNetwork, switchNetwork } =
    useShouldSwitchNetwork(chainId);

  const handleClaimReward = () => {
    if (isNeedSwitchNetwork) {
      switchNetwork();
      return;
    }

    claimRewardMutation(stakeAddress)
      .then(() => {
        track.event(AnalyticsEvent.ClaimRewardsSuccess, {
          tokenName,
          stakeAddress,
        });

        triggerToast({
          message: `Successfully claimed ${tokenName}`,
          description: 'Check your updated Balance.',
        });
      })
      .catch((error) => {
        console.error(error);

        track.event(
          isErrorUserRejected(error)
            ? AnalyticsEvent.ClaimRewardsReject
            : AnalyticsEvent.ClaimRewardsError,
          {
            tokenName,
            stakeAddress,
            message: JSON.stringify(error),
          },
        );

        if (!isErrorUserRejected(error)) {
          triggerToast({
            message: `Something went wrong`,
            description:
              'We were unable to complete the current operation. Try again or connect feedback.',
            type: ToastType.Error,
          });
        }
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
