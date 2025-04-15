'use client';

import React from 'react';

import clsx from 'clsx';
import Link from 'next/link';

import ArrowIcon from '@/shared/assets/icons/arrow-left-bold.svg';
import { ComponentWithProps } from '@/shared/types';
import { Button, Text, TextView } from '@/shared/ui';

import ZeroIcon from '../assets/icons/zero.svg';

import styles from './NotFoundPage.module.scss';

type NotFoundPageProps = {};

export const NotFoundPage: ComponentWithProps<NotFoundPageProps> = ({
  className,
}) => {
  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.title}>
        <Text>4</Text>
        <span className={styles.zeroContainer}>
          <ZeroIcon />
        </span>
        <Text>4</Text>
      </div>
      <Text className={styles.subtitle} textView={TextView.H3}>
        Page not found
      </Text>
      <Text className={styles.description}>
        The page you’re looking for was removed or doesn’t exist
      </Text>
      <Link className={styles.buttonContainer} href={'/'}>
        <Button className={styles.button} endIcon={<ArrowIcon />}>
          Back to main page
        </Button>
      </Link>
    </div>
  );
};
