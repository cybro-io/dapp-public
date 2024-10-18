import { InputHTMLAttributes } from 'react';

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
};
