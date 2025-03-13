import React from 'react';

import { getEthTokenBalance } from '@/shared/lib';

export const useGetTokenBalance = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchBalance = async (
    ...props: Parameters<typeof getEthTokenBalance>
  ) => {
    try {
      setIsLoading(true);
      return await getEthTokenBalance(...props);
    } catch (error) {
      console.error(error);
      return '';
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, fetchBalance };
};
