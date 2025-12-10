'use client';

import React from 'react';

import {
  FlagProvider as VendorFlagProvider,
  IConfig,
} from '@unleash/proxy-client-react';

const config: IConfig = {
  url: process.env.NEXT_PUBLIC_UNLEASH_API_URL ?? '',
  clientKey: process.env.NEXT_PUBLIC_UNLEASH_API_KEY ?? '',
  appName: 'dapp',
};

export const FlagProvider = ({ children }: React.PropsWithChildren) => {
  return <VendorFlagProvider config={config}>{children}</VendorFlagProvider>;
};
