import React from 'react';

import clsx from 'clsx';

import { links, useMediaQuery } from '@/shared/lib';
import { Button, Link, LinkView, Text, TextView } from '@/shared/ui';

import blogStyles from './Blog.module.scss';

export const HubBanner = () => {
  const isMediumScreen = useMediaQuery('md');

  if (!isMediumScreen) {
    return (
      <div
        className={clsx(
          'mt-[70px] w-full max-w-[1204px] h-[631px] relative pt-[55px] px-9 pb-[54px]',
          "before:pointer-events-none before:top-0 before:right-0 before:absolute before:w-full before:h-full before:bg-[url('/images/HubBanner.png')] before:z-[1] before:bg-[length:100%_100%] before:bg-no-repeat",
        )}
      >
        <div
          className={clsx(
            blogStyles.blog,
            'relative w-full h-full bg-black pt-[86px] pl-[90px]',
          )}
        >
          <div className="absolute flex flex-col max-w-[490px] z-[2]">
            <Text
              textView={TextView.H3}
              className="whitespace-pre-wrap !text-[50px] !text-text-accent-yellow first-line:text-white"
            >
              {'join the\npoints hunt'}
            </Text>
            <Text
              textView={TextView.H4}
              className="mt-2 !font-normal !font-poppins"
            >
              To start racking up CYBRO Points by getting friends onboard,
              you'll need to grab some CYBRO tokens
            </Text>
            <a href={links.preSale} target={'_blank'} rel="noreferrer">
              <Button className="w-fit my-[26px]">Buy cybro tokens</Button>
            </a>
            <Link
              viewType={LinkView.Link}
              href={links.docCybroPoints}
              target={'_blank'}
            >
              watch our detailed Cybro points faq
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "self-center w-[375px] h-[603px] bg-[url('/images/HubBannerMobile.png')] bg-[length:100%_100%] relative mt-[42px] pt-[42px]",
      )}
    >
      <div className="flex flex-col items-center text-center">
        <Text
          textView={TextView.H3}
          className="whitespace-pre-wrap !text-text-accent-yellow first-line:text-white"
        >
          {'join the\npoints hunt'}
        </Text>
        <Text textView={TextView.P3} className="mt-2.5 max-w-[241px]">
          To start racking up CYBRO Points by getting friends onboard, you'll
          need to grab some CYBRO tokens
        </Text>
        <a href={links.preSale} target={'_blank'} rel="noreferrer">
          <Button className="w-fit mt-[271px] mb-4">Buy cybro tokens</Button>
        </a>
        <Link
          viewType={LinkView.Link}
          href={links.docCybroPoints}
          target={'_blank'}
          className="max-w-[173px]"
        >
          watch our detailed Cybro points faq
        </Link>
      </div>
    </div>
  );
};
