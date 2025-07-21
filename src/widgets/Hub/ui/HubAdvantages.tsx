import React from 'react';

import clsx from 'clsx';

import { Group, Stack, Title, Typography } from '@/shared/ui';

import styles from './Hub.module.scss';

export const HubAdvantages = () => {
  return (
    <Stack className="gap-8 max-w-[1018px]">
      <Stack className="items-center px-6 md:px-0">
        <Title order={{ md: 2, base: 3 }} uppercase className="text-center">
          Invest Smarter, Not Harder
        </Title>
        <Typography
          order={2}
          variant="poppins"
          className="text-white/60 max-w-[681px] text-center"
          weight="regular"
        >
          Choose CYBRO for a secure, efficient investment experience. Enjoy 24/7
          support, easy deposits, clear ROI, and top-tier security with audited
          vaults. Invest with confidence!
        </Typography>
      </Stack>

      <Stack className="gap-[18px] md:px-0 px-3 items-center">
        <Group className="gap-[18px] justify-center">
          {/* 1 advantage */}
          <div
            className={clsx(
              'w-[355px] md:w-[561px] h-[172px] md:h-[320px] rounded-[30px] pl-[22px] pt-5 md:pl-[30px] md:pt-7',
              styles.advantage1,
            )}
          >
            <Stack className="gap-2 max-w-[181px]">
              <Title uppercase order={{ md: 3, base: 4 }}>
                Deposit from any token or fiat
              </Title>
              <Typography
                variant="poppins"
                order={3}
                className="max-w-[167px] text-white/60"
              >
                Deposit using&nbsp;
                <text className="text-white font-bold">100+ tokens</text>&nbsp;
                across&nbsp;
                <text className="text-white font-bold">30+ blockchains</text> or
                choose from&nbsp;
                <text className="text-white font-bold">
                  15+ fiat currencies
                </text>
              </Typography>
            </Stack>
          </div>

          {/* 2 advantage */}
          <div
            className={clsx(
              'w-[355px] md:w-[439px] h-[243px] md:h-[320px] rounded-[30px] pl-[22px] pt-5 md:pl-[30px] md:pt-7',
              styles.advantage2,
            )}
          >
            <Stack className="gap-2 max-w-[295px]">
              <Title uppercase order={{ md: 3, base: 4 }}>
                24/7 Support
              </Title>
              <Typography variant="poppins" order={3} className="text-white/60">
                Our support team is here to assist you with&nbsp;
                <text className="text-white font-bold">any questions</text>{' '}
                about the UI, investment vaults, or technical issues.
              </Typography>
            </Stack>
          </div>
        </Group>

        {/* 3 advantage */}
        <div
          className={clsx(
            'items-center w-[355px] md:w-full h-[403px] md:h-[320px] rounded-[30px] pl-[22px] pt-5 md:pl-[30px] md:pt-7',
            styles.advantage3,
          )}
        >
          <Stack className="gap-2 max-w-[297px] md:max-w-[210px]">
            <Title uppercase order={{ md: 3, base: 4 }}>
              <text className="text-text-accent-yellow">Seamless</text> User
              experience
            </Title>
            <Typography variant="poppins" order={3} className="text-white/60">
              <text className="text-white font-bold">
                Effortless deposits, advanced portfolio management,
              </text>
              &nbsp; and&nbsp;
              <text className="text-white font-bold">smart notifications</text>
              &nbsp; — focus only on what truly matters.
            </Typography>
          </Stack>
        </div>

        <Group className="gap-[18px] justify-center">
          {/* 4 advantage */}
          <div
            className={clsx(
              'w-[355px] md:w-[320px] h-[207px] md:h-[320px] rounded-[30px] pl-[22px] pt-5 md:pl-[30px] md:pt-7',
              styles.advantage4,
            )}
          >
            <Stack className="gap-2 max-w-full md:max-w-[240px] ">
              <Title uppercase order={{ md: 3, base: 4 }}>
                Clear ROI Calculation
              </Title>
              <Typography
                variant="poppins"
                order={3}
                className="max-w-[297px] md:max-w-[198px] text-white/60"
              >
                Track your earnings with&nbsp;
                <text className="text-white font-bold">
                  transparent projections and breakdowns
                </text>
                , making it easy to make informed investment decisions.
              </Typography>
            </Stack>
          </div>

          {/* 5 advantage */}
          <div
            className={clsx(
              'w-[355px] md:w-[680px] h-[320px] rounded-[30px] pl-[22px] pt-5 md:pl-[30px] md:pt-7',
              styles.advantage5,
            )}
          >
            <Stack className="gap-2 max-w-[297px] md:max-w-[224px]">
              <Title uppercase order={{ md: 3, base: 4 }}>
                Secure
              </Title>
              <Typography variant="poppins" order={3} className="text-white/60">
                Your investments are protected with&nbsp;
                <text className="text-white font-bold">
                  fully audited vaults and top security standards
                </text>
                , ensuring peace of mind through third-party audits.
              </Typography>
            </Stack>
          </div>
        </Group>
      </Stack>
    </Stack>
  );
};
