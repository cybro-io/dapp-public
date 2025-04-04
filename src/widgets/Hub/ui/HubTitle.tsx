import React from 'react';

import Image from 'next/image';

import { Title } from '@/shared/ui';

import CardsHubTitleImage from '../lib/assets/cards-hub-title.png';
import CybroHubTitleImage from '../lib/assets/cybro-hub-title.png';
import TokenHubTitleImage from '../lib/assets/token-hub-title.png';
import UserHubTitleImage from '../lib/assets/user-hub-title.png';

export const HubTitle = () => {
  return (
    <React.Fragment>
      {/* desktop view */}
      <Title
        order={1}
        uppercase
        className="hidden md:inline max-w-[1096px] text-center bg-[linear-gradient(180deg,#FFF_0%,rgba(255,255,255,0.40)_100%)] bg-clip-text text-transparent"
      >
        With CYBRO
        <Image
          src={CybroHubTitleImage}
          alt="cybro"
          className="inline align-text-top pointer-events-none"
        />
        , earning is easy. Find top
        <Image
          src={CardsHubTitleImage}
          alt="cards"
          className="inline align-text-top mx-1 pointer-events-none"
        />
        vaults, get
        <Image
          src={UserHubTitleImage}
          alt="user"
          className="inline align-text-top mx-1 pointer-events-none"
          width={63}
        />
        AI-driven insights, deposit
        <Image
          src={TokenHubTitleImage}
          alt="token"
          className="inline align-text-bottom h-[94px] pointer-events-none"
        />
        in one click — securely & instantly
      </Title>

      {/* mobile view */}
      <Title
        order={3}
        uppercase
        className="md:hidden inline max-w-[1096px] text-center bg-[linear-gradient(180deg,#FFF_80%,rgba(255,255,255,0.40)_100%)] bg-clip-text text-transparent"
      >
        With&nbsp;
        <Image
          src={CybroHubTitleImage}
          alt="cybro"
          className="inline align-text-bottom pointer-events-none"
          width={66}
        />
        &nbsp; CYBRO, earning is easy.
        <br />
        <br />
        Find top
        <Image
          src={CardsHubTitleImage}
          alt="cards"
          className="inline align-middle mx-1 pointer-events-none"
          width={55}
        />
        vaults,
        <br />
        <br />
        get
        <Image
          src={UserHubTitleImage}
          alt="user"
          className="inline align-text-top mx-1 pointer-events-none"
          width={35}
        />
        AI-driven
        <br />
        insights,
        <br />
        deposit
        <Image
          loading="eager"
          src={TokenHubTitleImage}
          alt="token"
          className="inline align-middle pointer-events-none"
          width={66}
        />
        in one
        <br />
        click — securely
        <br />& instantly
      </Title>
    </React.Fragment>
  );
};
