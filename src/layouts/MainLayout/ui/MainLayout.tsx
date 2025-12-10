import React from 'react';

import {
  Button,
  ButtonSize,
  ButtonView,
  Group,
  Text,
  TextView,
} from '@/shared/ui';
import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';
import { ProfileStatsPopover } from '@/widgets/ProfileStatsPopover';

export const MainLayout = ({ children }: React.PropsWithChildren) => {
  const handleClick = () => {
    window.open('https://pro.cybro.io', '_blank');
  };

  return (
    <React.Fragment>
      <Group className="py-1 items-center justify-center bg-text-accent-yellow gap-2">
        <Text textView={TextView.C2} className="!text-[#1a1b25] font-bold">
          Introducing new version of Cybro
        </Text>
        <Button
          onClick={handleClick}
          view={ButtonView.Secondary}
          size={ButtonSize.Small}
        >
          Try it now
        </Button>
      </Group>
      <Header connectedComponent={<ProfileStatsPopover />} />
      <main className="w-full flex-1 mx-auto">{children}</main>
      <Footer />
    </React.Fragment>
  );
};
