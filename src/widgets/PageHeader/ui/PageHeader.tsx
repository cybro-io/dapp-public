import React from 'react';

import clsx from 'clsx';

import { Group, Title } from '@/shared/ui';

import styles from './PageHeader.module.scss';

export const PageHeader = ({
  children,
  className,
}: Pick<React.HTMLAttributes<HTMLDivElement>, 'children' | 'className'>) => (
  <section className={clsx(styles.section, className)}>{children}</section>
);

const HeaderTitle = ({ children }: React.PropsWithChildren) => {
  return (
    <Group className={styles.titleWrapper}>
      <Title
        order={{ base: 2, md: 1 }}
        uppercase
        className="!text-[25px] md:!text-[62px]"
      >
        {children}
      </Title>
    </Group>
  );
};

PageHeader.Title = HeaderTitle;
