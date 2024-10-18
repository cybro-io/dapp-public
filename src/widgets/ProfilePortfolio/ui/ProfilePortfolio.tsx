'use client';

import React from 'react';

import { useMediaQuery } from '@/shared/lib';

import { useProfilePortfolio } from '../model/useProfilePortfolio';

import { ProfilePortfolioDesktop } from './ProfilePortfolioDesktop';
import { ProfilePortfolioMobile } from './ProfilePortfolioMobile';

const ProfilePortfolio = () => {
  const { isLoading, fields, isPortfolioUnavailable } = useProfilePortfolio();

  const isSmallScreen = useMediaQuery('sm');

  if (isPortfolioUnavailable) {
    return null;
  }

  if (isSmallScreen) {
    return <ProfilePortfolioMobile fields={fields} isLoading={isLoading} />;
  }

  return <ProfilePortfolioDesktop fields={fields} isLoading={isLoading} />;
};

export default ProfilePortfolio;
