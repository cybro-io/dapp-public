import React from 'react';

import clsx from 'clsx';

import { useMediaQuery } from '@/shared/lib';
import { Text, TextView } from '@/shared/ui';

export const HubHero = () => {
  const isMediumScreen = useMediaQuery('md');

  return (
    <section
      id="hub-hero"
      className={clsx(
        "bg-[url('/images/HubHeroMobile.png')] h-[250px] flex justify-center items-center",
        "md:bg-[url('/images/HubHero.png')] md:h-[492px] md:block",
        'w-full mt-[2.5px] bg-contain bg-no-repeat bg-center',
      )}
    >
      <div
        className={clsx(
          'static md:absolute',
          'flex flex-col items-center gap-4 mx-auto left-0 right-0 top-[96px] max-w-[492px]',
        )}
      >
        <Text
          textView={isMediumScreen ? TextView.H3 : TextView.H2}
          className="first-line:!text-white !text-text-accent-yellow text-center"
        >
          {'Find Your Ideal\nInvestment vault'}
        </Text>
        <Text textView={TextView.BP2} className="!text-white/80 text-center">
          Discover a range of investment options tailored to your needs, from
          automated solutions to customizable strategies
        </Text>
      </div>
    </section>
  );
};
