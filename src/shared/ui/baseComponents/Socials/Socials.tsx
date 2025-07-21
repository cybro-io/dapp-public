'use client';

import React from 'react';

import clsx from 'clsx';
import Link from 'next/link';

import DiscordIcon from '@/shared/assets/socials/discord.svg';
import TelegramIcon from '@/shared/assets/socials/telegram.svg';
import TwitterIcon from '@/shared/assets/socials/twitter.svg';
import { socialLinks } from '@/shared/lib';
import { ComponentWithProps } from '@/shared/types';

import styles from './Socials.module.scss';

type SocialsProps = {};

export const Socials: ComponentWithProps<SocialsProps> = ({ className }) => {
  return (
    <div className={clsx(styles.root, className)}>
      <Link
        className={styles.social}
        href="https://x.com/Cybro_io"
        target="_blank"
      >
        <TwitterIcon />
      </Link>
      <Link
        className={styles.social}
        href={socialLinks.discord}
        target="_blank"
      >
        <DiscordIcon />
      </Link>
      <Link
        className={styles.social}
        href="https://t.me/cybro_io"
        target="_blank"
      >
        <TelegramIcon />
      </Link>
    </div>
  );
};
