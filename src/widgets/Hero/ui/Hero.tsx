import React from 'react';

import clsx from 'clsx';

import { Text, TextView } from '@/shared/ui';

import styles from './Hero.module.scss';

export const Hero = () => {
  return (
    <section className={clsx(styles.heroSection)}>
      <Hero.Title>Swap / Exchange</Hero.Title>
    </section>
  );
};

const Title = ({ children }: React.PropsWithChildren) => {
  return (
    <Text className={clsx(styles.heading)} textView={TextView.H1}>
      <span
        className={clsx(styles.headingBackground, styles.headingBackgroundTop)}
      >
        {children}
      </span>
    </Text>
  );
};

Hero.Title = Title;
