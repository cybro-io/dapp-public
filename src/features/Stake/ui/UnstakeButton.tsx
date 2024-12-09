import React from 'react';

import { ChainId } from '@lifi/sdk';

import { triggerToast, useShouldSwitchNetwork } from '@/shared/lib';
import { Button, ButtonSize, ButtonView, ToastType } from '@/shared/ui';

import { useUnstakeToken } from '../model/useUnstakeToken';

interface UnstakeButtonProps {
  stakeAddress: string;
}

export const UnstakeButton = ({ stakeAddress }: UnstakeButtonProps) => {
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
        triggerToast({
          message: 'Successfully unstacked Locked CYBRO',
          description: 'Check your updated balance.',
        });
      })
      .catch((error) => {
        console.error(error);
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
