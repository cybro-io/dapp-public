'use client';

import React from 'react';

import { Badge, Button, ButtonProps } from '@heroui/react';

import Bell from '@assets/icons/bell.svg';

interface NotificationButtonProps extends Pick<ButtonProps, 'onPress'> {
  count?: number;
}

export const NotificationButton = React.forwardRef(
  (
    { count, ...props }: NotificationButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    return (
      <Badge
        isInvisible={!count}
        color="warning"
        content={String(count)}
        size="sm"
        variant="solid"
      >
        <Button
          ref={ref}
          isIconOnly
          aria-label="Notifications"
          variant="faded"
          className="bg-black rounded-[10px] border-transparent hover:border-white"
          {...props}
        >
          <Bell />
        </Button>
      </Badge>
    );
  },
);
