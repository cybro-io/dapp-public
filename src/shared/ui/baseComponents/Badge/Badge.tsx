import React from 'react';

import { Typography } from '@/shared/ui';

export const Badge = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="bg-white flex px-[3px] items-center text-black w-fit h-[17px]">
      <Typography order={3}>{children}</Typography>
    </div>
  );
};
