import { useMediaQuery as useMediaQueryUHT } from 'usehooks-ts';

import { theme } from '../../../../tailwind.config';

type Breakpoint = keyof typeof theme.screens;

const getMediaQuery = () => {
  return Object.fromEntries(
    Object.keys(theme.screens).map((key) => [
      key,
      `(max-width: ${theme.screens[key as Breakpoint]})`,
    ]),
  ) as Record<keyof typeof theme.screens, string>;
};

export const useMediaQuery = (
  query: Breakpoint,
  options?: {
    defaultValue?: boolean;
    initializeWithValue?: boolean;
  },
) => {
  return useMediaQueryUHT(getMediaQuery()[query], options);
};
