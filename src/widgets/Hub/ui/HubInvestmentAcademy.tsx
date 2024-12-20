import React from 'react';

import { VideoCard } from '@/entities/Hub';
import { useMediaQuery } from '@/shared/lib';
import { Button, ButtonView, Text, TextView } from '@/shared/ui';

export const HubInvestmentAcademy = () => {
  const isMedium = useMediaQuery('md');

  return (
    <section
      id="investment-academy"
      className="flex flex-col gap-9 items-center"
    >
      <div className="flex flex-col gap-4 items-center text-center">
        <Text textView={isMedium ? TextView.H3 : TextView.H2}>
          Cybro Investment Academy
        </Text>
        <Text
          textView={TextView.BP2}
          className="!text-white/80 text-center max-w-[687px]"
        >
          This section shows the historical APY for our High Yield BTC Strategy
          vault, highlighting its success in leveraging market trends to enhance
          returns for Vault investors.
        </Text>
      </div>

      <div className="flex flex-row gap-5 w-full justify-center overflow-auto scrollbar-hide">
        <VideoCard title="Title" subtitle="Subtitle" href="/" />
        <VideoCard title="Title" subtitle="Subtitle" href="/" />
        <VideoCard title="Title" subtitle="Subtitle" href="/" />
      </div>

      <div className="px-6 md:px-0">
        <Button view={ButtonView.Secondary} className="w-full md:w-[367px]">
          Check our youtube
        </Button>
      </div>
    </section>
  );
};
