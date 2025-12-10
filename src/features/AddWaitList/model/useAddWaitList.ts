import React from 'react';

import ReCAPTCHA from 'react-google-recaptcha';

import { getErrorMessage, useToast } from '@/shared/lib';
import {
  useAddToWaitlistApiV1WaitlistSignupPost,
  useCaptchaApiV1WaitlistCaptchaGet,
  WaitListPayload,
} from '@/shared/types';
import { ToastType } from '@/shared/ui';

export const useAddWaitList = () => {
  const { triggerToast } = useToast();

  const recaptchaRef = React.useRef<ReCAPTCHA>(null);

  const { data: captchaKey, isLoading: isLoadingCaptcha } =
    useCaptchaApiV1WaitlistCaptchaGet({
      query: {
        select: (data) => data.data.data.sitekey,
      },
    });
  const { mutateAsync, isSuccess } = useAddToWaitlistApiV1WaitlistSignupPost();

  const handleAddWaitList = async (
    data: Omit<WaitListPayload, 'captcha_answer'>,
  ) => {
    const captchaToken = await recaptchaRef?.current?.executeAsync();

    if (!captchaToken) {
      throw new Error('Captcha token failed.');
    }

    return mutateAsync({
      data: {
        captcha_answer: captchaToken,
        ...data,
      },
    })
      .then(() => {
        triggerToast({
          message: 'Success',
          description: 'You have been added to waitlist',
        });
      })
      .catch((error) => {
        triggerToast({
          message: 'Error',
          description: getErrorMessage(error),
          type: ToastType.Error,
        });
      });
  };

  return {
    captchaKey,
    isLoadingCaptcha,
    handleAddWaitList,
    recaptchaRef,
    isSuccess,
  };
};
