import React from 'react';

import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';

import styles from './Loader.module.scss';

type LoaderProps = {};

export const Loader: ComponentWithProps<LoaderProps> = ({ className }) => {
  return <div className={clsx(styles.spinner, className)} />;
};
