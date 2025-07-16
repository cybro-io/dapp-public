'use client';

import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';
import ReCAPTCHA from 'react-google-recaptcha';

import {
  useAddWaitList,
  useAddWaitListForm,
  WaitListEvent,
} from '@/features/AddWaitList';
import { ComponentWithProps } from '@/shared/types';
import { Button, ButtonSize, Text, TextView } from '@/shared/ui';

import styles from './AiBrokerComingPage.module.scss';

type OneClickPageProps = {};

export const AiBrokerComingPage: ComponentWithProps<OneClickPageProps> = ({
  className,
}) => {
  const { handleAddWaitList, isLoadingCaptcha, captchaKey, recaptchaRef } =
    useAddWaitList();

  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useAddWaitListForm(async ({ email }) =>
    handleAddWaitList({ email, event: WaitListEvent.aiBroker }),
  );

  const isDisabledSubmit = !isValid || isLoadingCaptcha || isSubmitting;

  return (
    <section className={clsx(styles.root, className)}>
      <div className={styles.left}>
        <Text className={styles.title} textView={TextView.H2}>
          <span className={styles.accent}>Ai</span> Broker
        </Text>
        <div className={styles.imageContainerMobile}>
          <Image src={'/oneClickBg.webp'} alt={''} height={264} width={375} />
        </div>
        <Text className={styles.subtitle} textView={TextView.H3}>
          COMING SOON IN Q1 2025
        </Text>
        <Text className={styles.description} textView={TextView.P2}>
          We are creating a convenient way for you to manage investments
          tailored to your needs, whether you're a beginner in web3 or a
          professional investor. AI Broker will help you find suitable
          strategies and deploy a personalized smart contract for you. Only for
          CYBRO holders.
        </Text>
        <Text className={styles.joinUs}>
          <span className={styles.accent}>Join our waiting list now </span>
          and be the first to know when the AI Broker goes live. Just drop your
          email below, and we'll give you a heads up when it's go-time.
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
