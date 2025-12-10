import React from 'react';

import { ComponentWithProps } from '@/shared/types';
import { Text, TextView } from '@/shared/ui';
import { SupportRequest } from '@/widgets/SupportRequest';

import styles from './SupportRequestPage.module.scss';

type SupportRequestPageProps = {};

export const SupportRequestPage: ComponentWithProps<
  SupportRequestPageProps
> = () => {
  return (
    <div className={styles.root}>
      <Text className={styles.title} textView={TextView.H2}>
        Feedback
      </Text>
      <SupportRequest className={styles.form} />
    </div>
  );
};
