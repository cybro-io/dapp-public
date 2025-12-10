import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { Group, Stack, Title, Typography } from '@/shared/ui';
import ArrowRightBoldIcon from '@assets/icons/arrow-right-bold.svg';

import { whyUsMap } from '../lib/constants/why-us';

import styles from './Hub.module.scss';

export const HubWhyUs = () => {
  return (
    <Stack className="gap-6 md:gap-8 max-w-[1180px] w-full items-center">
      <Title order={{ md: 2, base: 3 }} uppercase className="text-center px-6">
        Built <text className="text-text-accent-yellow">for Your</text>&nbsp;
        Investment Needs
      </Title>

      <Stack className="w-full">
        {whyUsMap.map((item, index) => (
          <Link
            key={item.id}
            target="_blank"
            href={item.href}
            className={clsx(
              'flex flex-row w-full flex-nowrap items-center justify-between pr-[22px] md:pr-[54px] border border-solid border-transparent hover:border-text-accent-logoYellow',
              item.bgColor,
              styles.whyUs,
            )}
          >
            <Image
              loading="lazy"
              src={item.image}
              alt={`why-use-${index}`}
              className="pr-[22px] md:pr-[31px] self-end md:w-[150px] w-[78px]"
            />

            <Group className="items-center justify-between flex-[2] gap-y-2 md:py-0 py-5">
              <Title
                order={{ md: 3, base: 5 }}
                uppercase
                className="whitespace-normal md:whitespace-pre-wrap"
              >
                {item.title}
              </Title>
              <Group className="flex-nowrap gap-[29px]">
                <Typography
                  order={{ md: 1, base: 3 }}
                  variant={{ md: 'unbounded', base: 'poppins' }}
                  className="text-white/60 text-left md:text-right"
                >
                  {item.description}
                </Typography>
              </Group>
            </Group>

            <Group className="flex-[0] md:flex-1 justify-end scale-50 md:scale-100 md:max-w-full max-w-11">
              {item.isComingSoon ? (
                <Typography
                  order={3}
                  className="text-white/20 text-center"
                  uppercase
                  weight="regular"
                >
                  COMING
                  <br />
                  SOON
                </Typography>
              ) : (
                <ArrowRightBoldIcon />
              )}
            </Group>
          </Link>
        ))}
      </Stack>
    </Stack>
  );
};
