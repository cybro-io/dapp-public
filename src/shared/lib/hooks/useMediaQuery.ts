import { useMediaQuery as useMediaQueryUHT } from 'usehooks-ts';

import { Breakpoint, TailwindBreakpoint } from '@/shared/types';

import { theme } from '../../../../tailwind.config';

export const useMediaQuery = (
  query: Breakpoint,
  options?: {
    defaultValue?: boolean;
    initializeWithValue?: boolean;
  },
) => {
  return useMediaQueryUHT(
    `(max-width: ${theme.screens[query as TailwindBreakpoint]})`,
    options,
  );
};

export type UseMatchesInput<T> = Partial<Record<Breakpoint, T>>;

const BREAKPOINTS = [
  'sm',
  'md',
  'fundOrder',
  'lg',
  'lg2',
  'xl',
  'governance',
  'xl2',
];

function getFirstMatchingValue<T>(
  value: UseMatchesInput<T>,
  biggestMatch: Breakpoint | undefined,
): T {
  if (!biggestMatch) {
    if (!('base' in value)) {
      throw new Error('useMatches must be property "base"');
    }
    return value.base!;
  }

  let index = BREAKPOINTS.indexOf(biggestMatch);

  while (index >= 0) {
    if (BREAKPOINTS[index] in value) {
      return value[BREAKPOINTS[index]]!;
    }
    index -= 1;
  }

  return value.base!;
}

function getFirstMatchingBreakpoint(matches: (boolean | undefined)[]) {
  return matches.findLastIndex((v) => v);
}

export function useMatches<T>(
  payload: UseMatchesInput<T>,
  options?: { defaultValue?: boolean; initializeWithValue?: boolean },
) {
  const smMatches = useMediaQueryUHT(
    `(min-width: ${theme.screens.sm})`,
    options,
  );
  const mdMatches = useMediaQueryUHT(
    `(min-width: ${theme.screens.md})`,
    options,
  );
  const fundOrderMatches = useMediaQueryUHT(
    `(min-width: ${theme.screens.fundOrder})`,
    options,
  );
  const lgMatches = useMediaQueryUHT(
    `(min-width: ${theme.screens.lg})`,
    options,
  );
  const lg2Matches = useMediaQueryUHT(
    `(min-width: ${theme.screens.lg2})`,
    options,
  );
  const xlMatches = useMediaQueryUHT(
    `(min-width: ${theme.screens.xl})`,
    options,
  );
  const governanceMatches = useMediaQueryUHT(
    `(min-width: ${theme.screens.governance})`,
    options,
  );
  const xl2Matches = useMediaQueryUHT(
    `(min-width: ${theme.screens.xl2})`,
    options,
  );

  const breakpoints = [
    smMatches,
    mdMatches,
    fundOrderMatches,
    lgMatches,
    lg2Matches,
    xlMatches,
    governanceMatches,
    xl2Matches,
  ];
  const firstMatchingBreakpointIndex = getFirstMatchingBreakpoint(breakpoints);
  return getFirstMatchingValue(
    payload,
    BREAKPOINTS[firstMatchingBreakpointIndex],
  );
}
