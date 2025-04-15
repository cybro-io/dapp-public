import React from 'react';

import HubWhyUs1Image from '../assets/hub-why-us-1.png';
import HubWhyUs2Image from '../assets/hub-why-us-2.png';
import HubWhyUs3Image from '../assets/hub-why-us-3.png';
import HubWhyUs4Image from '../assets/hub-why-us-4.png';

export const whyUsMap = [
  {
    id: 'workers',
    image: HubWhyUs1Image,
    title: 'Workers earning\nin stablecoins',
    description: (
      <React.Fragment>
        Invest now to&nbsp;
        <br className="hidden md:block" />
        earn&nbsp;
        <text className="text-text-accent-yellow">15% APY</text>&nbsp;
        <br className="hidden md:block" />
        in stablecoins
      </React.Fragment>
    ),
    tokens: ['USDC', 'DAI', 'USDT'],
    isComingSoon: false,
    bgColor: 'bg-[#000]',
  },
  {
    id: 'professional',
    image: HubWhyUs2Image,
    title: 'Professional\ninvestors and funds',
    description: (
      <React.Fragment>
        Explore high-yield&nbsp;
        <br className="hidden md:block" />
        vaults offering
        <br className="hidden md:block" />
        &nbsp;
        <text className="text-text-accent-yellow">5% APY</text>
        &nbsp; in ETH
      </React.Fragment>
    ),
    tokens: ['ETH'],
    isComingSoon: false,
    bgColor: 'bg-[#0E0F12]',
  },
  {
    id: 'casual_crypto',
    image: HubWhyUs3Image,
    title: 'Casual crypto\ninvestors',
    description: (
      <React.Fragment>
        Know when to&nbsp;
        <br className="hidden md:block" />
        jump in — trust&nbsp;
        <br className="hidden md:block" />
        our <text className="text-text-accent-yellow">87 Blast Index</text>
      </React.Fragment>
    ),
    tokens: ['BLAST'],
    isComingSoon: false,
    bgColor: 'bg-[#15171B]',
  },
  {
    id: 'newcomers',
    image: HubWhyUs4Image,
    title: 'Newcomers\nto DeFi',
    description: (
      <React.Fragment>
        Let <text className="text-text-accent-yellow">AI Broker</text>
        &nbsp;guide&nbsp;
        <br className="hidden md:block" />
        you through your first&nbsp;
        <br className="hidden md:block" />
        DeFi investments
      </React.Fragment>
    ),
    tokens: ['USER'],
    isComingSoon: true,
    bgColor: 'bg-[#1F2125]',
  },
];
