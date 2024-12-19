import React from 'react';

import { ComponentWithProps } from '@/shared/types';
import { AvailableVaultsV2 } from '@/widgets/AvailableVaults';

type HomePageProps = {};

export const ExplorePage: ComponentWithProps<HomePageProps> = () => {
  return <AvailableVaultsV2 />;
};
