import React, { HTMLAttributes } from 'react';

import { Input } from '@heroui/input';
import clsx from 'clsx';
import ReCAPTCHA from 'react-google-recaptcha';
import { Controller } from 'react-hook-form';

import {
  useAddWaitList,
  useAddWaitListForm,
  WaitListEvent,
} from '@/features/AddWaitList';
import { Button, Stack, Title, Typography } from '@/shared/ui';

import styles from './VaultWaitList.module.scss';

export const VaultWaitList = ({
  className,
  vaultId,
}: Pick<HTMLAttributes<HTMLDivElement>, 'className'> & { vaultId: number }) => {
  const {
    handleAddWaitList,
    captchaKey,
    isLoadingCaptcha,
    recaptchaRef,
    isSuccess,
  } = useAddWaitList();

  const form = useAddWaitListForm(async ({ email }) => {
    await handleAddWaitList({
      email,
      event: WaitListEvent.vaultWaitList,
      extra: String(vaultId),
    });
  });

  return (
    <Stack
      data-success={isSuccess}
      className={clsx(
        '-mx-6 md:mx-0 w-screen md:w-full max-w-auto md:max-w-[375px] h-auto md:h-[560px] bg-background-modal rounded-none md:rounded-[30px] p-6 justify-end',
        styles.root,
        className,
      )}
    >
      <Stack className="gap-4">
        <Stack className="max-w-[217px] md:max-w-full gap-1">
          <Title
            order={{ base: 4, md: 3 }}
            uppercase={{ base: false, md: true }}
            className={clsx(isSuccess && 'first-line:text-text-accent-yellow')}
          >
            {isSuccess
              ? "You're on the list! We'll notify you once this Vault goes live."
              : 'Be the first to access this Vault'}
          </Title>
          <Typography
            variant="poppins"
            order={{ base: 3, md: 2 }}
            weight="regular"
            className="text-white/60"
          >
            {isSuccess
              ? 'No spam. One-time notification only.'
              : 'Get notified when it launches and receive early access.'}
          </Typography>
        </Stack>

        {!isSuccess && (
          <form className="flex flex-col gap-2" onSubmit={form.handleSubmit}>
            <Controller
              control={form.control}
              render={({ field, fieldState }) => (
                <Input
                  size="lg"
                  placeholder="Your email here"
                  {...field}
                  isInvalid={fieldState.invalid}
                  errorMessage={fieldState.error?.message}
                />
              )}
              name="email"
            />

            <Button
              type="submit"
              disabled={isLoadingCaptcha || !form.formState.isValid}
            >
              Get early access
            </Button>
          </form>
        )}
      </Stack>

      {captchaKey && (
        <ReCAPTCHA ref={recaptchaRef} size="invisible" sitekey={captchaKey} />
      )}
    </Stack>
  );
};
