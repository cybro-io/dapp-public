import React from 'react';

import clsx from 'clsx';

import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';
import { ProfileStatsPopover } from '@/widgets/ProfileStatsPopover';

import styles from './BaseLayout.module.scss';

type BaseLayoutProps = {
  hasFooter?: boolean;
  children: React.ReactNode;
  withMainPadding?: boolean;
};

export const BaseLayout = ({
  hasFooter = true,
  children,
  withMainPadding = true,
}: BaseLayoutProps) => {
  return (
    <React.Fragment>
      <Header
        className={styles.header}
        connectedComponent={<ProfileStatsPopover />}
      />
      <main className={clsx(styles.main, !hasFooter && styles.noFooter)}>
        <div className={clsx(withMainPadding && styles.mainContent)}>
          {children}
        </div>
      </main>
      {hasFooter && <Footer className={styles.footer} />}
    </React.Fragment>
  );
};

const Container = ({
  children,
  className,
}: Pick<React.HTMLAttributes<HTMLDivElement>, 'children' | 'className'>) => {
  return (
    <div
      className={clsx(
        'relative max-w-[1280px] px-[38px] md:px-6 mx-auto',
        className,
      )}
    >
      {children}
    </div>
  );
};

BaseLayout.Container = Container;
