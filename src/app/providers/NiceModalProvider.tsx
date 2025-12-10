'use client';
import React from 'react';

import NiceModal from '@ebay/nice-modal-react';

export const NiceModalProvider = ({ children }: React.PropsWithChildren) => {
  return <NiceModal.Provider>{children}</NiceModal.Provider>;
};
