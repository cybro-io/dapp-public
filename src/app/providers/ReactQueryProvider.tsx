'use client';

import React from 'react';

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { ComponentWithProps } from '@/shared/types';

type QueryClientProviderProps = {
  children: React.ReactNode;
};

export const ReactQueryProvider: ComponentWithProps<
  QueryClientProviderProps
> = ({ children }) => {
  let browserQueryClient: QueryClient | undefined = undefined;

  const getQueryClient = () => {
    if (isServer) {
      return makeQueryClient();
    } else {
      if (!browserQueryClient) {
        browserQueryClient = makeQueryClient();
      }

      return browserQueryClient;
    }
  };

  const makeQueryClient = () => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
        },
      },
    });
  };

  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
