'use client';

import DangerIcon from '../assets/icons/danger.svg';
import GoodIcon from '../assets/icons/good.svg';
import WarningIcon from '../assets/icons/warning.svg';

export enum TrustScoreViewType {
  Mobile = 'mobile',
  Desktop = 'desktop',
  Small = 'small',
}

export enum TrustScoreColor {
  Danger = 'danger',
  Warning = 'warning',
  Good = 'good',
}

export const TrustScoreColorToIcon = {
  [TrustScoreColor.Danger]: <DangerIcon />,
  [TrustScoreColor.Warning]: <WarningIcon />,
  [TrustScoreColor.Good]: <GoodIcon />,
};
