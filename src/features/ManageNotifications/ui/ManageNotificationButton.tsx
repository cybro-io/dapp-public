'use client';

import React from 'react';

import { Button } from '@heroui/button';

import Setting2Icon from '@assets/icons/setting-2.svg';

import { ManageNotificationButtonProps } from './types';

export const ManageNotificationButton = (
  props: ManageNotificationButtonProps,
) => {
  return (
    <Button
      className="border-stroke-tableBorder bg-background-chips rounded-full font-medium font-poppins"
      variant="bordered"
      {...props}
    >
      Manage <Setting2Icon />
    </Button>
  );
};
