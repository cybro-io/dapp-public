import React from 'react';

import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';
import { ModalLayout } from '@/shared/ui';

import { SupportRequest } from './SupportRequest';
// import styles from './SupportRequestModal.module.scss';

type SupportRequestModalProps = {};

export const SupportRequestModal: ComponentWithProps<
  SupportRequestModalProps
> = ({ className }) => {
  return (
    <ModalLayout title={'Support'}>
      <SupportRequest />
    </ModalLayout>
  );
};
