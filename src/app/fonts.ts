import { Poppins, Unbounded, Noto_Sans_Mono } from 'next/font/google';

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

export const notoSansMono = Noto_Sans_Mono({
  weight: ['400', '500', '700'],
  style: ['normal'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-noto-sans-mono',
});
