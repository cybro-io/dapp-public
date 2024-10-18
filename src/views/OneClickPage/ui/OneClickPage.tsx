'use client';

import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';
import ReCAPTCHA from 'react-google-recaptcha';

import { useAddWaitList, useAddWaitListForm } from '@/features/AddWaitList';
import { ComponentWithProps } from '@/shared/types';
import { Button, ButtonSize, Text, TextView } from '@/shared/ui';

import styles from './OneClickPage.module.scss';

type OneClickPageProps = {};

export const OneClickPage: ComponentWithProps<OneClickPageProps> = ({
  className,
}) => {
  const { handleAddWaitList, isLoadingCaptcha, captchaKey, recaptchaRef } =
    useAddWaitList();

  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useAddWaitListForm(async ({ email }) => handleAddWaitList(email));

  const isDisabledSubmit = !isValid || isLoadingCaptcha || isSubmitting;

  return (
    <section className={clsx(styles.root, className)}>
      <div className={styles.left}>
        <Text className={styles.title} textView={TextView.H2}>
          <span className={styles.accent}>One-Click</span> Investing
        </Text>
        <div className={styles.imageContainerMobile}>
          <Image src={'/oneClickBg.webp'} alt={''} height={264} width={375} />
        </div>
        <Text className={styles.subtitle} textView={TextView.H3}>
          Coming&nbsp;Soon This&nbsp;Year
        </Text>
        <Text className={styles.description} textView={TextView.P2}>
          Get hyped for our upcoming One-Click Investing feature! We're cooking
          up some awesome, user-friendly strategies to help you invest in our
          Pools and Vaults like a pro.
        </Text>
        <Text className={styles.joinUs}>
          <span className={styles.accent}>Join our waiting list now </span>
          and be the first to know when we launch. Just drop your email below,
          and we'll give you a heads up when it's go-time.
        </Text>
      </div>
      <div className={styles.right}>
        <div className={styles.imageContainerDesktop}>
          <Image
            src={'/oneClickBgDesktop.webp'}
            alt={''}
            height={530}
            width={620}
          />
        </div>
        <form onSubmit={handleSubmit} className={styles.formContainer}>
          <input
            className={styles.input}
            placeholder="Your email here"
            type="email"
            {...register('email')}
          />
          <Button
            className={styles.submitButton}
            size={ButtonSize.Large}
            type="submit"
            disabled={isDisabledSubmit}
          >
            Count me in
          </Button>
        </form>
        <Text className={styles.caption} textView={TextView.C3}>
          <span className={styles.bold}>No spam.</span> Only updates and release
          announcements.
        </Text>
      </div>
      {captchaKey && (
        <ReCAPTCHA ref={recaptchaRef} size="invisible" sitekey={captchaKey} />
      )}
    </section>
  );
};
