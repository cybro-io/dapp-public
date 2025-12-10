import React from 'react';

import { ButtonProps } from '@heroui/react';

export interface SettingFieldProps {
  icon?: React.ReactNode;
  name: string;
  description: string;
  isSelected?: boolean;
  isDisabled?: boolean;
  onValueChange?: (isSelected: boolean) => void;
  isComing?: boolean;
}

export interface SettingCategoryProps extends React.PropsWithChildren {
  name: string;
}

export interface ManageNotificationsProps {
  onClose?: () => void;
}

export interface ManageNotificationButtonProps
  extends Pick<ButtonProps, 'onClick'> {}
