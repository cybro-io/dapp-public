import React from 'react';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

import { PropsWithClassName } from '@/shared/types';
import { Stack } from '@/shared/ui';
import { useAiBrokerContext } from '@/widgets/AiBroker';
import { AiBrokerMessageType } from '@/widgets/AiBroker/model/types';

export const AiBrokerBox = ({
  children,
  className,
}: React.PropsWithChildren<PropsWithClassName>) => {
  const { lastMessage } = useAiBrokerContext();

  const bg = React.useMemo(() => {
    if (lastMessage?.type === AiBrokerMessageType.success) {
      return { first: 'bg-[#04E000]', second: 'bg-[#04E000]/50' };
    }

    if (lastMessage?.type === AiBrokerMessageType.error) {
      return { first: 'bg-[#FF3D6C80]', second: 'bg-[#FF3D6C80]' };
    }

    return { first: 'bg-[#fbff3a]', second: 'bg-[#fbff3a]' };
  }, [lastMessage]);

  return (
    <Stack
      className={twMerge(
        'z-0 overflow-hidden relative w-full md:w-[700px] h-fit md:h-[calc(100vh-71px-50px-50px-32px-34px)] max-h-[726px] min-h-[550px] rounded-none md:rounded-[30px] bg-[#13141b] border border-solid border-white/10',
        className,
      )}
    >
      <div className="w-[569px] h-[579px] left-[-100px] md:left-[65.5px] bottom-[-310px] md:bottom-[-289px] absolute z-[-1]">
        <div
          className={clsx(
            bg.first,
            'z-[-1] w-[569px] h-[579px] left-0 top-0 absolute opacity-30 rounded-full blur-[192.72px]',
          )}
        />
        <div
          className={clsx(
            bg.second,
            'z-[-1] w-[408.05px] h-[194.58px] left-[80.47px] top-[192.92px] absolute rounded-full blur-[129.76px]',
          )}
        />
      </div>
      {children}
    </Stack>
  );
};
