import React from 'react';

import clsx from 'clsx';

import { Tvl } from '@/entities/Tvl';
import { ComponentWithProps } from '@/shared/types';
import { Socials, Text, TextView } from '@/shared/ui';
import { AvailableVaults } from '@/widgets/AvailableVaults';
import { ProfilePortfolio } from '@/widgets/ProfilePortfolio';

import styles from './HomePage.module.scss';

type HomePageProps = {};

export const HomePage: ComponentWithProps<HomePageProps> = (props) => {
  return (
    <React.Fragment>
      <section className={clsx(styles.heroSection)}>
        <Text className={styles.heading} textView={TextView.H1}>
          <span
            className={clsx(
              styles.headingBackground,
              styles.headingBackgroundTop,
            )}
          >
            <span className={styles.accent}>Diversify</span> & Earn
          </span>
          <br />
          <span className={styles.headingBackground}>with SecureD Vaults</span>
        </Text>
        <Text className={styles.description}>
          Explore our vaults for stable growth options with competitive APYs and
          Cybro Points. Select the ideal vault for your strategy and boost your
          portfolio today.
        </Text>
        <div className={styles.bottomContainer}>
          <Tvl />
          <Socials />
        </div>
      </section>
      <div className="px-0 2lg:px-[100px] flex flex-col gap-6 2lg:gap-8 pt-6 2lg:pt-0">
        {/*<ProfilePortfolio />*/}
        <AvailableVaults />
      </div>
    </React.Fragment>
  );
};
