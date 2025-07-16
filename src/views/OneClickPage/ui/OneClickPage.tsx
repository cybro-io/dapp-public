'use client';

import React from 'react';

import { HubHero } from '@/widgets/Hub';
import { OneClickVaults } from '@/widgets/OneClickVaults';

export const OneClickPage = () => {
  return (
    <section>
      <div className="relative flex flex-col max-w-screen-xl mx-auto">
        <HubHero
          title="Vaults"
          desc="We’re wrapping complex mechanics in simple, user-friendly Vaults, making investing and earning yield, tokens, and points easier than ever"
        />
        <OneClickVaults />
      </div>
    </section>
  );
};
