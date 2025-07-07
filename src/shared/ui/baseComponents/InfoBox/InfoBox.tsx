'use client';

import React from 'react';

import { Skeleton } from '@heroui/react';
import clsx from 'clsx';

import ArrowIcon from '@/shared/assets/icons/chevron-up.svg';
import { ComponentWithProps } from '@/shared/types';
import {
  InfoBoxActionType,
  InfoBoxViewType,
  Text,
  TextView,
} from '@/shared/ui';

import styles from './InfoBox.module.scss';

type InfoBoxProps = {
  title: string;
  icon: React.ReactNode;
  value: string;
  isOpened?: boolean;
  setIsOpened?: (...args: any[]) => void;
  rightContent?: React.ReactNode;
  viewType?: InfoBoxViewType;
  actionType?: InfoBoxActionType;
  dropdownButtonContent?: string;
  dropdownItems?: React.ReactNode[];
  isLoading?: boolean;
};

export const InfoBox: ComponentWithProps<InfoBoxProps> = ({
  title,
  icon,
  value,
  isOpened,
  setIsOpened,
  rightContent,
  viewType = InfoBoxViewType.Mobile,
  actionType = InfoBoxActionType.Pure,
  dropdownButtonContent,
  dropdownItems,
  isLoading = false,
  className,
}) => {
  const isDropdown = actionType !== InfoBoxActionType.Pure;

  return (
    <div
      className={clsx(
        styles.root,
        styles[viewType],
        styles[actionType],
        className,
      )}
    >
      <div className={styles.mainContainer}>
        <div
          className={clsx(styles.iconContainer, styles.iconContainerDesktop)}
        >
          {icon}
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.titleContainer}>
              <div
                className={clsx(
                  styles.iconContainer,
                  styles.iconContainerMobile,
                )}
              >
                {icon}
              </div>
              <Text className={styles.title} textView={TextView.C3}>
                {title}
              </Text>
            </div>
            {rightContent && (
              <div className={styles.rightContent}>{rightContent}</div>
            )}
          </div>
          {isLoading ? (
            <Skeleton className="flex rounded-lg w-24 h-8" />
          ) : (
            <Text textView={TextView.H4} className={styles.value}>
              {value}
            </Text>
          )}
        </div>
      </div>
      {isDropdown && !!dropdownItems?.length && (
        <div className={styles.dropdownContainer}>
          {isOpened && (
            <React.Fragment>
              <Text textView={TextView.P3} className={styles.timeframe}>
                Timeframe
              </Text>
              <ul className={styles.dropdownList}>
                {dropdownItems.map((item, index) => {
                  return (
                    <li className={styles.dropdownItem} key={index}>
                      {item}
                    </li>
                  );
                })}
              </ul>
            </React.Fragment>
          )}
          <button className={styles.dropdownButton} onClick={setIsOpened}>
            {dropdownButtonContent}
            <div
              className={clsx(
                styles.arrowIconContainer,
                isOpened && styles.isOpened,
              )}
            >
              <ArrowIcon />
            </div>
          </button>
        </div>
      )}
    </div>
  );
};
