'use client';

import React from 'react';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ComponentWithProps } from '@/shared/types';

import styles from './MenuLink.module.scss';

type MenuLinkProps = {
  href: string;
  children: React.ReactNode;
  isDisabled?: boolean;
  isComingSoon?: boolean;
  isBeta?: boolean;
};

export const MenuLink: ComponentWithProps<MenuLinkProps> = ({
  href,
  isDisabled = false,
  isComingSoon = false,
  isBeta = false,
  className,
  children,
}) => {
  const pathname = usePathname();

  const isSelected = React.useMemo(
    () => pathname.includes(href),
    [href, pathname],
  );

  return (
    <Link
      className={clsx(
        styles.root,
        isSelected && styles.selected,
        isDisabled && styles.disabled,
        className,
      )}
      href={href}
      onClick={(event) => isDisabled && event.preventDefault()}
    >
      {!isComingSoon && isBeta && (
        <p className={styles.comingSoonBanner}>Beta</p>
      )}
      {isComingSoon && <p className={styles.comingSoonBanner}>Coming Soon</p>}
      {children}
    </Link>
  );
};
