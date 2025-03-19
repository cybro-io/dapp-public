import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';

import { BadgeVaultsResponseData, ComponentWithProps } from '@/shared/types';
import { Text, TextView } from '@/shared/ui';
import { isEven } from '@/shared/utils';

import CircleIcon from '../../../assets/icons/base-icon.svg';

import styles from './TooltipInfo.module.scss';

type TooltipInfoProps = {
  chips: BadgeVaultsResponseData[];
};

export const TooltipInfo: ComponentWithProps<TooltipInfoProps> = ({
  chips,
  className,
}) => {
  return (
    <div className={clsx(styles.root, className)}>
      <Text className={styles.title} textView={TextView.C1}>
        Points
      </Text>
      <div className={styles.dataContainer}>
        {chips.map((chip, index) => {
          return (
            <div
              className={clsx(
                styles.chipItem,
                !isEven(index + 1) && styles.dark,
              )}
              key={chip.name}
            >
              <Text className={styles.itemTitle} textView={TextView.C4}>
                {chip.icon ? (
                  <Image src={chip.icon} height={20} width={20} alt={''} />
                ) : (
                  <CircleIcon />
                )}
                {chip.name}
              </Text>
              <Text className={styles.itemValue} textView={TextView.C4}>
                {chip.value}
              </Text>
            </div>
          );
        })}
      </div>
    </div>
  );
};
