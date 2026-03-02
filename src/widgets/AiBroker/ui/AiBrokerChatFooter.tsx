import React from 'react';

import { Stack } from '@/shared/ui';
import { useAiBrokerContext } from '@/widgets/AiBroker';

import { AiBrokerConfirmDeposit } from './stepper/AiBrokerConfirmDeposit';
import { AiBrokerInputAddress } from './stepper/AiBrokerInputAddress';
import { AiBrokerInputAmount } from './stepper/AiBrokerInputAmount';
import { AiBrokerUndo } from './stepper/AiBrokerUndo';

export const AiBrokerChatFooter = () => {
  const { selectedFund } = useAiBrokerContext();

  return (
    <Stack className="px-8 pt-3 w-full flex-nowrap">
      {selectedFund && (
        <React.Fragment>
          <AiBrokerInputAddress />
          <AiBrokerInputAmount />
          <AiBrokerConfirmDeposit />
        </React.Fragment>
      )}

      <AiBrokerUndo />
    </Stack>
  );
};
