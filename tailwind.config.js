'use client';

// because we can't use ES modules here
/* eslint @typescript-eslint/no-var-requires: "off" */
const { heroui } = require('@heroui/react');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      unbounded: ['var(--font-unbounded)', 'sans-serif'],
      poppins: ['var(--font-poppins)', 'sans-serif'],
      notoSansMono: ['var(--font-noto-sans-mono)', 'sans-serif'],
    },
    screens: {
      sm: '640px',
      md: '768px',
      fundOrder: '940px',
      lg: '1024px',
      lg2: '1100px',
      xl: '1280px',
      governance: '1330px',
      xl2: '1536px',
    },
    extend: {
      background: {
        hero: 'linear-gradient(148deg, rgba(255, 255, 255, 0.10) 3.15%, rgba(107, 109, 121, 0.07) 96.78%)',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    require('tailwindcss-animated'),
    heroui({
      themes: {
        light: {
          colors: {
            background: {
              window: '#11121A',
              modal: '#020206',
              card: '#000000',
              tableRow: '#1A1B25',
              chips: '#24252E',
              bgBlur: 'rgba(0, 0, 0, 0.50)',
              accentBold: '#F9E727',
              white: '#FFFFFF',
              tooltip: 'rgba(255, 255, 255, 0.30)',
              header: 'rgb(255 255 255 / .5)',
            },
            text: {
              white: {
                heading: '#FFFFFF',
                body100: '#FFFFFF',
                body80: 'rgba(255, 255, 255, 0.80)',
                body60: 'rgba(255, 255, 255, 0.60)',
                body40: 'rgba(255, 255, 255, 0.40)',
              },
              black: {
                heading: '#000000',
                body100: '#000000',
                body60: 'rgba(0, 0, 0, 0.60)',
              },
              accent: {
                logoYellow: '#FBFF3A',
                yellow: '#F9E727',
              },
            },
            trustScore: {
              green: {
                100: '#04E000',
                15: 'rgba(4, 224, 0, 0.15)',
              },
              yellow: {
                100: '#F9E727',
                15: 'rgba(249, 231, 39, 0.15)',
              },
              red: {
                100: '#FF3D6C',
                15: 'rgba(255, 61, 108, 0.15)',
              },
            },
            error: {
              label: '#FF3D6C',
              bg: '#5F192A',
            },
            button: {
              primary: {
                defaultLabel: '#0B0C1B',
                hoverLabel: '#0B0C1B',
                disabledBg: '#9B8E00',
                disabledLabel: '#0B0C1B',
              },
              secondary: {
                defaultBg: '#1A1B25',
                defaultLabel: '#FFFFFF',
                hoverBg: '#1A1B25',
                hoverLabel: '#FFFFFF',
                hoverStroke: '#F9E727',
                disabledBg: '#252525',
                disabledLabel: '#666666',
              },
            },
            stroke: {
              cardHover: '#F9E727',
              tableBorder: '#3A3B45',
              whiteBorder: '#FFFFFF',
            },
            link: {
              disabled: {
                disabledLabel: '#666666',
              },
              link: {
                defaultLabel: '#B3B5C0',
                hoverLabel: '#B3B5C0',
              },
              menu: {
                defaultLabel: '#FFFFFF',
                hoverLabel: '#F9E727',
                selectedLabel: '#0B0C1B',
                disabledLabel: '#0B0C1B',
              },
            },
          },
        },
      },
    }),
  ],
};
