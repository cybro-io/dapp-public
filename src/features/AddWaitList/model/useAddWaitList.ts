import React from 'react';

import ReCAPTCHA from 'react-google-recaptcha';

import { useToast } from '@/shared/hooks';
import {
  useAddToWaitlistApiV1WaitlistSignupPost,
  useCaptchaApiV1WaitlistCaptchaGet,
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
  const { mutateAsync } = useAddToWaitlistApiV1WaitlistSignupPost();

  const handleAddWaitList = async (email: string) => {
    const captchaToken = await recaptchaRef?.current?.executeAsync();

    if (!captchaToken) {
      throw new Error('Captcha token failed.');
    }

    return mutateAsync({
      data: {
        captcha_answer: captchaToken,
        email,
      },
    })
      .then(() => {
        triggerToast({
          message: 'Success',
          description: 'You have been added to waitlist',
        });
      })
      .catch(() => {
        triggerToast({
          message: 'Error',
          description: 'Unexpected error. Contact support',
          type: ToastType.Error,
        });
      });
  };

  return { captchaKey, isLoadingCaptcha, handleAddWaitList, recaptchaRef };
};
