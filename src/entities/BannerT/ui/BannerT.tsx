'use client';

import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';

import { BannerTColor, BannerTViewType } from '@/entities/BannerT';
import { ComponentWithProps } from '@/shared/types';
import { Link, LinkView, Text, TextView } from '@/shared/ui';

import accentBg from '../assets/img/AccentBannerBg.png';
import darkBg from '../assets/img/DarkBannerBg.png';

import styles from './BannerT.module.scss';

type BannerTProps = {
  title: string;
  description?: string;
  Button?: React.ReactNode;
  viewType?: BannerTViewType;
  color?: BannerTColor;
  linkText?: string;
  linkHref?: string;
};

export const BannerT: ComponentWithProps<BannerTProps> = ({
  title,
  description,
  Button,
  viewType = BannerTViewType.Mobile,
  color = BannerTColor.Accent,
  linkText,
  linkHref,
  className,
}) => {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [lineCount, setLineCount] = React.useState(0);
  const [freeSpacePerSide, setFreeSpacePerSide] = React.useState<number>(0);
  const [firstLineTitle, secondLineTitle] = title.split(/\\n|\n/);

  React.useEffect(() => {
    const updateLineCount = () => {
      if (rootRef.current && containerRef.current) {
        const rootHeight = rootRef.current.offsetHeight;
        const containerHeight = containerRef.current.offsetHeight;

        // Calculate free space on each side
        const freeSpacePerSide = (rootHeight - containerHeight) / 2;
        setFreeSpacePerSide(freeSpacePerSide);

        // Constants
        const lineHeight = 2; // Assuming each line is 2px in height
        const lineMargin = 10; // Margin between lines

        // Calculate max lines that can fit in the free space on one side
        const linesPerSide = Math.floor(
          freeSpacePerSide / (lineHeight + lineMargin),
        );

        // Total line count (top and bottom)
        const totalLineCount = linesPerSide * 2;
        setLineCount(totalLineCount);
      }
    };

    const resizeObserver = new ResizeObserver(() => {
      updateLineCount();
    });

    if (rootRef.current) {
      resizeObserver.observe(rootRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      className={clsx(styles.root, styles[viewType], styles[color], className)}
      ref={rootRef}
    >
      {/* Render lines */}
      {Array.from({ length: lineCount / 2 }).map((_, index) => {
        const initialOpacity = 0.8;

        return (
          <React.Fragment key={index}>
            {/* Top lines */}
            <div
              className={clsx(styles.line)}
              style={{
                top: `${freeSpacePerSide - (index + 1) * 10}px`,
                opacity: initialOpacity - (index * 1.2) / 10,
              }}
            ></div>
            {/* Bottom lines */}
            <div
              className={clsx(styles.line)}
              style={{
                bottom: `${freeSpacePerSide - (index + 1) * 10}px`,
                opacity: initialOpacity - (index * 1.2) / 10,
              }}
            ></div>
          </React.Fragment>
        );
      })}
      <div className={styles.container} ref={containerRef}>
        <div className={styles.innerContainer}>
          <Text textView={TextView.H3} className={styles.title}>
            {firstLineTitle}
            {secondLineTitle && (
              <React.Fragment>
                <br />{' '}
                <span className={styles.titleAccent}>{secondLineTitle}</span>
              </React.Fragment>
            )}
          </Text>
          {description && (
            <Text textView={TextView.P3} className={styles.description}>
              {description}
            </Text>
          )}
          {color === BannerTColor.Accent &&
            viewType === BannerTViewType.Mobile && (
              <Image
                className={styles.image}
                src={accentBg}
                alt={''}
                height={248}
                width={215}
              />
            )}
          {color === BannerTColor.Accent &&
            viewType === BannerTViewType.DesktopSmall && (
              <Image
                className={styles.image}
                src={accentBg}
                alt={''}
                height={208}
                width={188}
              />
            )}
          {color === BannerTColor.Dark &&
            viewType === BannerTViewType.Mobile && (
              <Image
                className={styles.image}
                src={darkBg}
                alt={''}
                height={248}
                width={215}
              />
            )}
          {color === BannerTColor.Dark &&
            viewType === BannerTViewType.DesktopSmall && (
              <Image
                className={styles.image}
                src={darkBg}
                alt={''}
                height={208}
                width={188}
              />
            )}
          <div className={styles.buttonContainer}>{Button}</div>
          {linkText && (
            <Link
              className={styles.link}
              viewType={LinkView.Link}
              href={linkHref}
              target={'_blank'}
            >
              {linkText}
            </Link>
          )}
        </div>
        {color === BannerTColor.Accent &&
          viewType === BannerTViewType.DesktopLarge && (
            <Image
              className={styles.largeImage}
              src={accentBg}
              alt={''}
              height={300}
              width={300}
            />
          )}
        {color === BannerTColor.Dark &&
          viewType === BannerTViewType.DesktopLarge && (
            <Image
              className={styles.largeImage}
              src={darkBg}
              alt={''}
              height={300}
              width={300}
            />
          )}
      </div>
    </div>
  );
};
