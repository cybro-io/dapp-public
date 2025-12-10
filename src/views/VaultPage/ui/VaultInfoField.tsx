import React from 'react';

import { Typography } from '@/shared/ui';

interface VaultInfoFieldProps {
  title: React.ReactNode;
  value: React.ReactNode;
}

export const VaultInfoField = ({ value, title }: VaultInfoFieldProps) => {
  return (
    <div className="flex flex-col gap-1 flex-1">
      {['string', 'number'].includes(typeof title) ? (
        <Typography variant="caption" order={4} className="text-white/40">
          {title}
        </Typography>
      ) : (
        title
      )}

      {['string', 'number'].includes(typeof value) ? (
        <Typography variant="poppins" order={3}>
          {value}
        </Typography>
      ) : (
        value
      )}
    </div>
  );
};
