'use client';

import React from 'react';

import clsx from 'clsx';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';

import { ConnectWallet } from '@/features/ConnectWallet';
import { useToast } from '@/shared/lib';
import { useAppKitAccount } from '@/shared/lib';
import {
  ComponentWithProps,
  useCaptchaApiV1WaitlistCaptchaGet,
  useCollectFeedbackApiV1CommonFeedbackPost,
} from '@/shared/types';
import { Button, ToastType } from '@/shared/ui';

import { SupportRequestField, SupportRequestFormValues } from '../types';

import styles from './SupportRequest.module.scss';

type SupportRequestProps = {};

export const SupportRequest: ComponentWithProps<SupportRequestProps> = ({
  className,
}) => {
  const { isConnected, address } = useAppKitAccount();
  const { data, isLoading } = useCaptchaApiV1WaitlistCaptchaGet();
  const { triggerToast } = useToast();
  const capchaRef: any = React.useRef();
  const { mutate } = useCollectFeedbackApiV1CommonFeedbackPost();

  const capchaKey = data?.data?.data?.sitekey;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<SupportRequestFormValues>({
    mode: 'onBlur',
  });

  const onSubmit = async (formData: SupportRequestFormValues) => {
    try {
      const token = await capchaRef?.current?.executeAsync();
      const email = formData?.email;
      const text = formData?.details;

      if (!token) {
        throw new Error('Captcha token failed.');
      }

      if (!address) {
        throw new Error('No address found.');
      }

      mutate({ data: { email, address, text, captcha_answer: token } });

      triggerToast({
        message: 'Success',
        description: 'Feedback have been sent!',
      });
      reset();
    } catch (e) {
      console.error(e);
      triggerToast({
        message: 'Error',
        description: 'Unexpected error. Contact support',
        type: ToastType.Error,
      });
    }
  };

  return (
    <form
      className={clsx(styles.form, className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.emailContainer}>
        <label>Your email:</label>
        <input
          {...register(SupportRequestField.Email, {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: 'Enter a valid email address',
            },
          })}
          type="email"
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>
      <div className={styles.detailsContainer}>
        <label>Details:</label>
        <textarea
          {...register(SupportRequestField.Details, {
            required: 'This field is required',
            minLength: {
              value: 10,
              message: 'Details should be at least 10 characters long',
            },
          })}
        />
        {errors.details && (
          <p className={styles.error}>{errors.details.message}</p>
        )}
      </div>
      <ConnectWallet
        className={styles.submitButton}
        whenConnectedComponent={
          <Button
            className={styles.submitButton}
            disabled={!isValid || isLoading || isSubmitting}
            type="submit"
          >
            Send
          </Button>
        }
      />
      {capchaKey && (
        <ReCAPTCHA ref={capchaRef} size="invisible" sitekey={capchaKey} />
      )}
    </form>
  );
};
