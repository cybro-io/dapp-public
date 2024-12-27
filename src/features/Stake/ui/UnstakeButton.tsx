import React from 'react';

import { ChainId } from '@lifi/sdk';

import { AnalyticsEvent, track } from '@/shared/analytics';
import { triggerToast, useShouldSwitchNetwork } from '@/shared/lib';
import { Button, ButtonSize, ButtonView, ToastType } from '@/shared/ui';

import { useUnstakeToken } from '../model/useUnstakeToken';

interface UnstakeButtonProps {
  stakeAddress: string;
  tokenName: string;
}

export const UnstakeButton = ({
  stakeAddress,
  tokenName,
}: UnstakeButtonProps) => {
  const { unstakeTokenMutation, isPending } = useUnstakeToken();

  const { switchNetwork, isNeedSwitchNetwork } = useShouldSwitchNetwork(
    ChainId.BLS,
  );

  const handleUnstake = () => {
    if (isNeedSwitchNetwork) {
      switchNetwork();
      return;
    }

    unstakeTokenMutation(stakeAddress)
      .then(() => {
        track.event(AnalyticsEvent.UnstakeSuccess, {
          token: tokenName,
          stakeAddress,
        });

        triggerToast({
          message: `Successfully unstaked ${tokenName}`,
          description: 'Check your updated balance.',
        });
      })
      .catch((error) => {
        console.error(error);

        track.event(AnalyticsEvent.UnstakeError, {
          token: tokenName,
          stakeAddress,
          message: JSON.stringify(error),
        });

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
      onClick={handleUnstake}
    >
      {isNeedSwitchNetwork ? 'Switch network' : 'Unstake & Claim rewards'}
    </Button>
  );
};
