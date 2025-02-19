'use client';

import React from 'react';

import { Button, ButtonProps } from '@nextui-org/react';

import Bell from '@assets/icons/bell.svg';

interface NotificationButtonProps extends Pick<ButtonProps, 'onClick'> {
  withBing?: boolean;
}

export const NotificationButton = React.forwardRef(
  (
    { withBing, ...props }: NotificationButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    return (
      <Button
        ref={ref}
        isIconOnly
        aria-label="Notifications"
        variant="faded"
        className="bg-black rounded-[10px] border-transparent hover:border-white"
        {...props}
      >
        {withBing && (
          <div className="absolute size-[5px] rounded-full bg-trustScore-red-100 top-2 right-3 shadow-[#ff3d6c_0px_0px_4px_0px]" />
        )}
        <Bell />
      </Button>
    );
  },
);
