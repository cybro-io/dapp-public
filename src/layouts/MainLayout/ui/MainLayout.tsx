import React from 'react';

import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';
import { ProfileStatsPopover } from '@/widgets/ProfileStatsPopover';

export const MainLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <React.Fragment>
      <Header connectedComponent={<ProfileStatsPopover />} />
      <main className="w-full flex-1 mx-auto">{children}</main>
      <Footer />
    </React.Fragment>
  );
};
