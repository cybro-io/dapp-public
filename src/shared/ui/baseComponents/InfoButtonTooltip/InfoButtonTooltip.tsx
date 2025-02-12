'use client';

import React from 'react';

import { Tooltip, TooltipProps, Button } from '@nextui-org/react';
import clsx from 'clsx';
import { useOnClickOutside } from 'usehooks-ts';

import { Group, Typography } from '@/shared/ui';
import typographyStyles from '@/shared/ui/baseComponents/Typography/Typography.module.scss';
import InfoOutlinedIcon from '@assets/icons/info-outlined.svg';

interface InfoButtonTooltipProps extends TooltipProps {}

export const InfoButtonTooltip = ({
  children,
  classNames,
  ...tooltipProps
}: InfoButtonTooltipProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const ref = React.useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => {
    setIsOpen(false);
  });

  return (
    <Tooltip
      closeDelay={100}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      {...tooltipProps}
      classNames={{
        ...classNames,
        content: clsx(
          'px-3 py-2 rounded-[8px] bg-white/30 backdrop-blur-[32px]',
          typographyStyles.textPoppins,
          typographyStyles.textPoppins3,
          classNames?.content,
        ),
      }}
    >
      <Group
        ref={ref}
        onTouchStart={() => setIsOpen((prevState) => !prevState)}
        className="w-fit gap-1 flex-nowrap items-center group cursor-pointer"
        data-disabled={Boolean(tooltipProps.isDisabled)}
      >
        {['string', 'number'].includes(typeof children) ? (
          <Typography
            order={3}
            uppercase
            weight="regular"
            className="text-link-link-defaultLabel group-hover:group-data-[disabled=false]:text-white group-data-[disabled=true]:text-link-disabled-disabledLabel"
          >
            {children}
          </Typography>
        ) : (
          children
        )}
        <Button
          disableRipple={true}
          disableAnimation={Boolean(tooltipProps.isDisabled)}
          isIconOnly
          className="rounded-full !min-w-5 !min-h-5 !size-5 bg-background-chips group-hover:group-data-[disabled=false]:bg-white group-data-[disabled=true]:text-link-disabled-disabledLabel"
        >
          <InfoOutlinedIcon className="text-link-link-defaultLabel group-hover:group-data-[disabled=false]:text-black group-data-[disabled=true]:text-black" />
        </Button>
      </Group>
    </Tooltip>
  );
};
