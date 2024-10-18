import { Poppins } from 'next/font/google';
import { Unbounded } from 'next/font/google';

export const unbounded = Unbounded({
  weight: ['300', '400', '500', '700', '900'],
  style: ['normal'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-unbounded',
});

export const poppins = Poppins({
  weight: ['300', '400', '500'],
  style: ['normal'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-poppins',
});
