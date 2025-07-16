'use client';

import React, { useEffect } from 'react';

import { useLocalStorage } from 'usehooks-ts';

import {
  REF_CODE_LOCAL_STORAGE_KEY,
  useSetReferral,
} from '@/entities/referral';
import { triggerToast, useAppKitAccount } from '@/shared/lib';
import { useHasReferrerApiV1ProfileAddressRefcodeGet } from '@/shared/types';
import { ToastType } from '@/shared/ui';

export const ReferralProgramProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [refCode, _, removeRefCode] = useLocalStorage<string | null>(
    REF_CODE_LOCAL_STORAGE_KEY,
    null,
  );

  const { address } = useAppKitAccount();

  const { mutateAsync } = useSetReferral();

  const { data, isLoading } = useHasReferrerApiV1ProfileAddressRefcodeGet(
    address!,
    {
      query: { enabled: Boolean(address), queryKey: ['hasReferral', address] },
    },
  );

  useEffect(() => {
    if (refCode && !isLoading && address && data?.data.data === false) {
      mutateAsync({ address, refCode })
        .catch((error: { message?: string }) => {
          console.error(error);

          triggerToast({
            message: `Something went wrong`,
            description: error.message ?? 'Unknown error',
            type: ToastType.Error,
          });
        })
        .finally(() => {
          removeRefCode();
        });
    }

    if (refCode && data?.data.data === true) {
      removeRefCode();
    }
  }, [data, refCode, address, isLoading, mutateAsync, removeRefCode]);

  return <React.Fragment>{children}</React.Fragment>;
};
