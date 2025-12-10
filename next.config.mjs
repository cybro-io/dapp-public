import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { withSentryConfig } from '@sentry/nextjs';

// Get the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/en/token',
        destination: '/token',
        permanent: true,
      },
      {
        source: '/en/governance',
        destination: '/governance',
        permanent: true,
      },
      {
        source: '/en',
        destination: '/',
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');

    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    );

    config.optimization.minimize = process.env.DISABLE_MINIMIZE !== 'true';

    return config;
  },
  sassOptions: {
    prependData: `@import "/src/shared/styles/variables.scss";`,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'linkee.ws',
      },
      {
        protocol: 'https',
        hostname: 's2.coinmarketcap.com',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'assets-global.website-files.com',
      },
      {
        protocol: 'https',
        hostname: 'l2beat.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'rootstock.blockscout.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.coingecko.com',
      },
      {
        protocol: 'https',
        hostname: 'taikoscan.io',
      },
      {
        protocol: 'https',
        hostname: 'blastscan.io',
      },
      {
        protocol: 'https',
        hostname: 's3.openocean.finance',
      },
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
  eslint: {
    // we run linters separately in CI
    ignoreDuringBuilds: true,
  },
  compiler: {
    removeConsole: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT === 'production',
  },
  compress: false,
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: 'cybro',
  project: 'dapp',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
  telemetry: false,
});
