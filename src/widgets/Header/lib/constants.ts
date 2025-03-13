export interface HeaderItem {
  title: string;
  href: string;
  children?: HeaderItem[];
  isComingSoon?: boolean;
  isDisabled?: boolean;
  shouldConnected?: boolean;
}

export const headerItems: HeaderItem[] = [
  {
    title: 'One-click',
    href: '/one-click',
  },
  {
    title: 'All Vaults',
    href: '/explore',
  },
  {
    title: 'Ai Broker',
    href: '/ai-broker',
    isComingSoon: true,
  },
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
    title: '$CYBRO',
    href: '/cybro',
    children: [
      { title: 'Staking', href: '/staking' },
      { title: 'Claim', href: '/claim' },
      { title: 'Bridge', href: '/bridge' },
    ],
  },
];
