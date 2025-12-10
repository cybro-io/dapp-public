'use client';

import React from 'react';

import { capitalize } from '@heroui/shared-utils';
import clsx from 'clsx';

import { useMatches, UseMatchesInput } from '@/shared/lib';

import styles from './Typography.module.scss';

type VariantType = 'unbounded' | 'poppins' | 'caption';
type ResponsiveVariantType = VariantType | UseMatchesInput<VariantType>;

type TypographyOrder = number;

type ResponsiveTypographyOrder =
  | TypographyOrder
  | UseMatchesInput<TypographyOrder>;

type TypographyWeight = 'regular' | 'medium' | 'semi-bold' | 'bold';
type ResponsiveTypographyWeight =
  | TypographyWeight
  | UseMatchesInput<TypographyWeight>;

interface TypographyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: ResponsiveVariantType;
  order?: ResponsiveTypographyOrder;
  component?: React.ElementType;
  uppercase?: boolean;
  weight?: ResponsiveTypographyWeight;
}

const classNamesWeight: Record<TypographyWeight, string> = {
  regular: '!font-normal',
  medium: '!font-medium',
  'semi-bold': '!font-semibold',
  bold: '!font-bold',
};

export const Typography = ({
  order = 1,
  children,
  className,
  component = 'p',
  variant,
  uppercase,
  weight = 'medium',
  ...props
}: TypographyProps) => {
  const Component = component;

  const defaultVariant = variant || 'unbounded';
  const responsiveVariant = useMatches(
    typeof defaultVariant === 'string'
      ? { base: defaultVariant }
      : defaultVariant,
  );

  const responsiveOrder = useMatches(
    typeof order === 'number' ? { base: order } : order,
  );

  const responsiveWeight = useMatches(
    typeof weight === 'string' ? { base: weight } : weight,
  );

  return (
    <Component
      {...props}
      className={clsx(
        styles[`text${capitalize(responsiveVariant)}`],
        styles[`text${capitalize(responsiveVariant)}${responsiveOrder}`],
        classNamesWeight[responsiveWeight],
        className,
        uppercase && 'uppercase',
      )}
    >
      {children}
    </Component>
  );
};
