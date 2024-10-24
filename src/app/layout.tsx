import React from 'react';

import './fonts';
import '@/shared/styles/global.scss';

import { GoogleAnalytics } from '@next/third-parties/google';
import clsx from 'clsx';
import type { Metadata } from 'next';
import Script from 'next/script';
import NextTopLoader from 'nextjs-toploader';

import { poppins, unbounded } from '@/app/fonts';
import { LiFiProvider } from '@/entities/LiFi';
import icon from '@/shared/assets/icons/favicon.ico';

import styles from './layout.module.scss';
import {
  BalanceProvider,
  EthersProvider,
  ModalContainer,
  ModalProvider,
  NiceModalProvider,
  ReactQueryProvider,
  ToastProvider,
  Web3Modal,
  WalletBalancesProvider,
} from './providers';
import { SafaryAnalytics } from './safary-analytics';

export const metadata: Metadata = {
  title: 'CYBRO - the first earn marketplace on Blast L2',
  description:
    'CYBRO is an earn marketplace where users can choose investment tools based on desired returns and risk levels, including staking, farming, and lending',
  openGraph: {
    title: 'CYBRO - the first earn marketplace on Blast L2',
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
      <SafaryAnalytics />
      <Web3Modal>
        <EthersProvider>
          <ReactQueryProvider>
            <BalanceProvider>
              <NiceModalProvider>
                <ModalProvider>
                  <WalletBalancesProvider>
                    <LiFiProvider>
                      <body
                        className={clsx(
                          styles.root,
                          unbounded.variable,
                          poppins.variable,
                        )}
                      >
                        <NextTopLoader
                          color="#F0D025"
                          showSpinner={false}
                          shadow={false}
                        />
                        <ToastProvider>{children}</ToastProvider>
                        <ModalContainer />
                      </body>
                      {!!gaId && <GoogleAnalytics gaId={gaId} />}
                    </LiFiProvider>
                  </WalletBalancesProvider>
                </ModalProvider>
              </NiceModalProvider>
            </BalanceProvider>
          </ReactQueryProvider>
        </EthersProvider>
      </Web3Modal>
    </html>
  );
}
