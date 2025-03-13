'use client';

import React from 'react';

import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';
import { Button, Text, TextView } from '@/shared/ui';

import styles from './ErrorMessage.module.scss';

type ErrorMessageProps = {};

// @todo why shared component in widget layout

export const ErrorMessage: ComponentWithProps<ErrorMessageProps> = ({
  className,
}) => {
  return (
    <div className={clsx(styles.root, className)}>
      <Text textView={TextView.H2}>Oh no</Text>
      <Text className={styles.description} textView={TextView.P1}>
        Something went wrong. We're already fixing this problem. Please try
        again in a couple of minutes.
      </Text>
      <Text className={styles.descriptionBottom} textView={TextView.P1}>
        If you keep seeing this error, please contact support.
      </Text>
      <Button onClick={() => window.location.reload()}>Reload page</Button>
    </div>
  );
};
