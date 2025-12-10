import React, { InputHTMLAttributes } from 'react';

export type AmountInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type'
> & {
  helperText?: string;
  label?: string;
  usd?: string | number | null;
  showPercent?: boolean;
  onSelectPercent?: (percent: number) => void;
  isPositive?: boolean;
  isOnlyNumber?: boolean;
  rightLabelSegment?: React.ReactNode;
  isLoading?: boolean;
  leftSection?: React.ReactNode;
};
