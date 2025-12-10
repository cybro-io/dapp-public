export interface HeaderItem {
  title: string;
  href: string;
  children?: HeaderItem[];
  isComingSoon?: boolean;
  isBeta?: boolean;
  isDisabled?: boolean;
  shouldConnected?: boolean;
}

export const AI_BROKER_PAGE_TITLE = 'Ai Broker';
export const headerItems: HeaderItem[] = [
  {
    title: 'Vaults',
    href: '/one-click',
  },
  // {
  //   title: 'All Vaults',
  //   href: '/explore',
  // },
  // {
  //   title: AI_BROKER_PAGE_TITLE,
  //   href: '/ai-broker',
  //   isComingSoon: false,
  //   isBeta: true,
  // },
  {
    title: 'Dashboard',
    href: '/dashboard',
    isDisabled: false,
    shouldConnected: true,
  },
  {
    title: 'Exchange',
    href: '/exchange',
    isDisabled: false,
  },
  {
    title: 'Referrals',
    href: '/referrals',
    isDisabled: false,
  },
  {
    title: '$CYBRO',
    href: '/cybro',
    children: [
      { title: 'Token', href: '/token' },
      { title: 'Governance', href: '/governance' },
      { title: 'Stake', href: 'https://cybro.io/cybro/staking' },
      { title: 'Claim', href: '/claim' },
      { title: 'Bridge', href: '/bridge' },
    ],
  },
];
