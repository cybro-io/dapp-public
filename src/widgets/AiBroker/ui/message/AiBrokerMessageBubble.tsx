import React from 'react';

import { twMerge } from 'tailwind-merge';

import { Group, Typography } from '@/shared/ui';

interface AiBrokerMessageBubbleProps {
  children: React.ReactNode;
  color: 'light' | 'dark';
}

export const AiBrokerMessageBubble = ({
  children,
  color,
}: AiBrokerMessageBubbleProps) => (
  <Group
    className={twMerge(
      'px-2 py-1.5 rounded-[8px] w-fit',
      color === 'light' ? 'bg-white/20' : 'bg-[#161616]',
    )}
  >
    <Typography
      variant="poppins"
      order={2}
      weight="regular"
      className="whitespace-pre-wrap"
      style={{ wordBreak: 'break-word' }}
    >
      {children}
    </Typography>
  </Group>
);
