import React from 'react';

import '@/app/fonts';
import '@/shared/styles/global.scss';

import { GoogleAnalytics } from '@next/third-parties/google';
import clsx from 'clsx';
import type { Metadata } from 'next';
import Script from 'next/script';
import NextTopLoader from 'nextjs-toploader';

import { poppins, unbounded, notoSansMono } from '@/app/fonts';
import {
  ModalContainer,
  ModalProvider,
  NiceModalProvider,
  ReactQueryProvider,
  ToastProvider,
  AppKit,
  FlagProvider,
  IntercomProvider,
  ServiceWorkerProvider,
} from '@/app/providers';
import { SafaryAnalyticsScript } from '@/app/safary-analytics';
import { LiFiProvider } from '@/entities/LiFi';
import { ReferralProgramProvider } from '@/entities/referral';
import { TokenBalancesUpdater } from '@/shared/lib';
import icon from '@assets/icons/favicon.ico';

import styles from './layout.module.scss';

export const metadata: Metadata = {
  title: 'CYBRO - an AI-Powered multichain earn marketplace',
  description:
    'CYBRO is an earn marketplace where users can choose investment tools based on desired returns and risk levels, including staking, farming, and lending',
  openGraph: {
    title: 'CYBRO - an AI-Powered multichain earn marketplace',
    description:
      'CYBRO is an earn marketplace where users can choose investment tools based on desired returns and risk levels, including staking, farming, and lending',
  },
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      url: icon.src,
    },
  ],
};

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta
          name="debank-cloud-site-verification"
          content="b9db472d6f7a21b3909711375a34bf65"
        />
      </head>
      <IntercomProvider>
        <Script
          async
          defer
          data-domain="app.cybro.io"
          src="https://analytics.cybro.io/js/script.js"
        />
        <Script async id="hotjar-script">
          {`(function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:5059762,hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`}
        </Script>
        <SafaryAnalyticsScript />
        <ServiceWorkerProvider />
        <FlagProvider>
          <AppKit>
            <ReactQueryProvider>
              <NiceModalProvider>
                <ModalProvider>
                  <LiFiProvider>
                    <TokenBalancesUpdater />
                    <body
                      className={clsx(
                        styles.root,
                        unbounded.variable,
                        poppins.variable,
                        notoSansMono.variable,
                      )}
                    >
                      <NextTopLoader
                        color="#F0D025"
                        showSpinner={false}
                        shadow={false}
                      />
                      <ToastProvider>
                        <ReferralProgramProvider>
                          {children}
                        </ReferralProgramProvider>
                      </ToastProvider>
                      <ModalContainer />
                    </body>
                    {!!gaId && <GoogleAnalytics gaId={gaId} />}
                  </LiFiProvider>
                </ModalProvider>
              </NiceModalProvider>
            </ReactQueryProvider>
          </AppKit>
        </FlagProvider>
      </IntercomProvider>
    </html>
  );
}
