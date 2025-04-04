import React from 'react';

import clsx from 'clsx';

import { useMediaQuery } from '@/shared/lib';
import { Group, Title } from '@/shared/ui';

import styles from './PageHeader.module.scss';

export const PageHeader = ({
  children,
  className,
}: Pick<React.HTMLAttributes<HTMLDivElement>, 'children' | 'className'>) => (
  <section className={clsx(styles.section, className)}>{children}</section>
);

const HeaderTitle = ({ children }: React.PropsWithChildren) => {
  const md = useMediaQuery('md');

  return (
    <Group className={styles.titleWrapper}>
      <Title
        order={md ? 2 : 1}
        uppercase
        className="!text-[25px] md:!text-[62px]"
      >
        {children}
      </Title>
    </Group>
  );
};

PageHeader.Title = HeaderTitle;
