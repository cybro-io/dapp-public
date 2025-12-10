'use client';
import React from 'react';

import { Exchange } from './exchange';
import { TokenHero } from './Hero';
import { TokenTrack } from './Track';
import { TokenUtility } from './Utility';
import WhereToBuy from './WhereToBuy';

export const TokenPage = () => {
  return (
    <React.Fragment>
      <TokenHero />
      {/*<Featured translations={translations.featuredTranslations} />*/}
      <WhereToBuy />
      <Exchange />
      <TokenTrack />
      <TokenUtility />
    </React.Fragment>
  );
};
