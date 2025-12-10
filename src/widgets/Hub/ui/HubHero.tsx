import React from 'react';

import clsx from 'clsx';

import { useMediaQuery } from '@/shared/lib';
import { Text, TextView } from '@/shared/ui';

interface HubHeroProps {
  title: string;
  desc: string;
}

export const HubHero = ({ desc, title }: HubHeroProps) => {
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
          'flex flex-col items-center gap-4 mx-auto left-0 right-0 top-[136px] max-w-[492px]',
        )}
      >
        <Text
          textView={isMediumScreen ? TextView.H3 : TextView.H2}
          className="!text-text-accent-yellow text-center"
        >
          {title}
        </Text>
        <Text textView={TextView.BP2} className="!text-white/80 text-center">
          {desc}
        </Text>
      </div>
    </section>
  );
};
