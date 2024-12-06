import React from 'react';

import { triggerToast } from '@/shared/lib';
import { Button, ButtonSize, ButtonView, ToastType } from '@/shared/ui';

import { useUnstakeToken } from '../model/useUnstakeToken';

interface UnstakeButtonProps {
  stakeAddress: string;
}

export const UnstakeButton = ({ stakeAddress }: UnstakeButtonProps) => {
  const { unstakeTokenMutation, isPending } = useUnstakeToken();

  const handleUnstake = () => {
    unstakeTokenMutation(stakeAddress)
      .then(() => {
        triggerToast({
          message: 'Successfully unstacked Locked CYBRO',
          description: 'Check your updated balance.',
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
      onClick={handleUnstake}
    >
      Unstake & Claim rewards
    </Button>
  );
};
