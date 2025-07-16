'use client';

import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import ArrowIcon from '@/shared/assets/icons/arrow-left-bold.svg';
import DiscordIcon from '@/shared/assets/socials/discord.svg';
import TelegramIcon from '@/shared/assets/socials/telegram.svg';
import TwitterIcon from '@/shared/assets/socials/twitter.svg';
import { links, socialLinks } from '@/shared/lib';
import { ComponentWithProps } from '@/shared/types';
import { Button, Logo } from '@/shared/ui';
import CybroFooterImage from '@images/CybroFooter.png';

import styles from './Footer.module.scss';

type FooterProps = {};

export const Footer: ComponentWithProps<FooterProps> = ({ className }) => {
  return (
    <footer className={clsx(styles.root, className)}>
      <div
        className={clsx(
          styles.imageWrapper,
          'relative flex justify-center items-center z-[-1]',
        )}
      >
        <Image src={CybroFooterImage} alt="Cybro" />
      </div>
      <div className={styles.footerWrapper}>
        <div className={styles.footerContainer}>
          <div className={clsx(styles.section)}>
            <div className={styles.logoContainer}>
              <Logo height={17} width={138} />
            </div>
            <p className={styles.slogan}>Your AI copilot for yield farming</p>
            <Link href="/token" rel="noreferrer">
              <Button className={styles.buyButton} endIcon={<ArrowIcon />}>
                Buy cybro tokens
              </Button>
            </Link>
          </div>
          <div className={clsx(styles.section)}>
            <p className={styles.sectionHeading}>Follow us</p>
            <ul className={clsx(styles.sectionList)}>
              <li className={clsx(styles.socialItem, styles.sectionItem)}>
                <Link
                  className={styles.socialLink}
                  href="https://x.com/Cybro_io"
                  target="_blank"
                >
                  <TwitterIcon />
                  <span>Twitter</span>
                </Link>
              </li>
              <li className={clsx(styles.socialItem, styles.sectionItem)}>
                <Link
                  className={styles.socialLink}
                  href={socialLinks.discord}
                  target="_blank"
                >
                  <DiscordIcon />
                  <span>Discord</span>
                </Link>
              </li>
              <li className={clsx(styles.socialItem, styles.sectionItem)}>
                <Link
                  className={styles.socialLink}
                  href="https://t.me/cybro_io"
                  target="_blank"
                >
                  {' '}
                  <TelegramIcon />
                  <span>Telegram</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className={clsx(styles.section)}>
            <p className={styles.sectionHeading}>Legal</p>
            <ul className={clsx(styles.sectionList)}>
              <li className={styles.sectionItem}>
                <a
                  href={'/Cybro Blast L2 Terms.pdf'}
                  target="_blank"
                  rel="noreferrer"
                >
                  Terms and Conditions
                </a>
              </li>
              <li className={styles.sectionItem}>
                <a href={'/Cybro Privacy.pdf'} target="_blank" rel="noreferrer">
                  Privacy Policy
                </a>
              </li>
              <li className={styles.sectionItem}>
                <Link href={'https://docs.cybro.io/cybro'} target="_blank">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>
          <div className={clsx(styles.section)}>
            <p className={styles.sectionHeading}>Company</p>
            <ul className={clsx(styles.sectionList)}>
              <li className={styles.sectionItem}>
                <Link href={'/feedback'}>Feedback</Link>
              </li>
            </ul>
            {/*<p className={clsx(styles.copyright, styles.copyrightLong)}>*/}
            {/*  CoinLock Protector LLC, Saint Vincent and the Grenadines*/}
            {/*</p>*/}
          </div>
        </div>
        <p className={styles.copyright}>CoinLock Protector LLC</p>
      </div>
    </footer>
  );
};
