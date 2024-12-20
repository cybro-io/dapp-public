import React from 'react';

import { capitalize } from '@nextui-org/shared-utils';
import clsx from 'clsx';

import styles from './Typography.module.scss';

type VariantType = 'unbounded' | 'poppins' | 'caption';
type TypographyOrder<Variant extends VariantType> = Variant extends 'caption'
  ? 1 | 2 | 3 | 4
  : 1 | 2 | 3;
type TypographyWeight = 'regular' | 'medium' | 'semi-bold' | 'bold';

interface TypographyProps<Variant extends VariantType = 'unbounded'>
  extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: Variant;
  order?: TypographyOrder<Variant>;
  component?: React.ElementType;
  uppercase?: boolean;
  weight?: 'regular' | 'medium' | 'semi-bold' | 'bold';
}

const classNamesWeight: Record<TypographyWeight, string> = {
  regular: 'font-normal',
  medium: 'font-medium',
  'semi-bold': 'font-semibold',
  bold: 'font-bold',
};

export const Typography = <Variant extends VariantType = 'unbounded'>({
  order = 1,
  children,
  className,
  component = 'p',
  variant,
  uppercase,
  weight = 'medium',
  ...props
}: TypographyProps<Variant>) => {
  const Component = component;
  const defVariant = variant || 'unbounded';

  return (
    <Component
      {...props}
      className={clsx(
        styles[`text${capitalize(defVariant)}`],
        styles[`text${capitalize(defVariant)}${order}`],
        classNamesWeight[weight],
        className,
        uppercase && 'uppercase',
      )}
    >
      {children}
    </Component>
  );
};
