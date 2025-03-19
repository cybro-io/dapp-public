import React from 'react';

import clsx from 'clsx';
import { motion, HTMLMotionProps } from 'framer-motion';

export const Group = React.forwardRef(
  (
    { children, className, ...restProps }: HTMLMotionProps<'div'>,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <motion.div
        ref={ref}
        className={clsx('flex flex-row flex-wrap', className)}
        {...restProps}
      >
        {children}
      </motion.div>
    );
  },
);
