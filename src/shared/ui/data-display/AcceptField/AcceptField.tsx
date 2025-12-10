import React from 'react';

import { Group, Typography } from '@/shared/ui';
import AcceptIcon from '@assets/icons/accept.svg';

export const AcceptField = ({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) => {
  return (
    <Group className="gap-2 flex-nowrap">
      <AcceptIcon className="flex-shrink-0" />
      <Typography order={3} className="text-left">
        <span className="text-text-accent-yellow">{title}:</span>
        &nbsp;{desc}
      </Typography>
    </Group>
  );
};
