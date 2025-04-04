import React from 'react';

import { Button, ButtonProps } from '@nextui-org/react';
import { CloseIcon } from '@nextui-org/shared-icons';

export const ClearFilterButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>((props, ref) => {
  return (
    <Button
      ref={ref}
      endContent={<CloseIcon />}
      size="sm"
      radius="full"
      variant="bordered"
      className="border-stroke-tableBorder border-1 bg-background-chips"
      {...props}
    >
      Clear filters
    </Button>
  );
});
