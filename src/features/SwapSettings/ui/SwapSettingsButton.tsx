import React from 'react';

import { SwapSettings } from '@/features/SwapSettings';
import SettingsIcon from '@/shared/assets/icons/settings-03.svg';
import { IconButton } from '@/shared/ui';

import { useSwapSettingsModal } from '../model/useSwapSettingsModal';

type SwapSettingsButtonProps = SwapSettings & {
  onChangeSettings: (data: SwapSettings) => void;
};

export const SwapSettingsButton = ({
  onChangeSettings,
  slippage,
  deadline,
}: SwapSettingsButtonProps) => {
  const { openModal } = useSwapSettingsModal();

  return (
    <IconButton
      type="button"
      className="border-solid border-1 border-stroke-tableBorder p-2.5 rounded-[10px] self-center"
      icon={<SettingsIcon className="text-white" />}
      onClick={() =>
        openModal({
          defaultSlippage: slippage,
          defaultDeadline: deadline,
        }).then((data) => onChangeSettings(data as SwapSettings))
      }
    />
  );
};
