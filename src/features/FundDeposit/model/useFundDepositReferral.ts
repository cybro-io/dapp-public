import React, { useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useSetReferral } from '@/entities/referral';
import { triggerToast, useAppKitAccount } from '@/shared/lib';
import {
  useHasReferrerApiV1ProfileAddressRefcodeGet,
  useValidateRefcodeApiV1ProfileValidateRefCodeGet,
} from '@/shared/types';
import { ToastType } from '@/shared/ui';
import { useGetReferralCode } from '@/widgets/referral/ReferralStats/model/useGetReferralCode';

const REFERRAL_CODE_LENGTH = 8;

export const useFundDepositReferral = () => {
  const { address } = useAppKitAccount();

  const { referralCode } = useGetReferralCode();

  const { data: hasReferral, isLoading: isLoadingHasReferral } =
    useHasReferrerApiV1ProfileAddressRefcodeGet(address!, {
      query: {
        enabled: Boolean(address),
        select: (data) => Boolean(data.data.data),
        queryKey: ['hasReferral', address],
      },
    });

  const [refCode, setRefCode] = React.useState('');
  const [isInvalid, setIsInvalid] = React.useState(false);

  const { data: isValidRefCode, isLoading: isLoadingValidRefCode } =
    useValidateRefcodeApiV1ProfileValidateRefCodeGet(refCode, {
      query: {
        enabled: refCode.length === REFERRAL_CODE_LENGTH,
        select: (data) => Boolean(data.data.data) && referralCode !== refCode,
        queryKey: ['validateReferral', refCode],
      },
    });

  const queryClient = useQueryClient();
  const { mutateAsync } = useSetReferral();
  const handleSetReferral = async (address: string) => {
    if (refCode.length !== REFERRAL_CODE_LENGTH && refCode.length) {
      setIsInvalid(true);
      return false;
    }

    if (refCode.length === 0) {
      return true;
    }

    return mutateAsync({ address, refCode })
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ['hasReferral', address] });

        return true;
      })
      .catch((error: { message?: string }) => {
        console.error(error);
        triggerToast({
          message: `Something went wrong`,
          description: error.message ?? 'Unknown error',
          type: ToastType.Error,
        });

        return false;
      });
  };

  useEffect(() => {
    return () => {
      setRefCode('');
      setIsInvalid(false);
    };
  }, []);

  useEffect(() => {
    if (refCode.length < 1 || refCode.length === REFERRAL_CODE_LENGTH) {
      setIsInvalid(false);
    }
  }, [refCode]);

  return {
    refCode,
    setRefCode,
    isValidRefCode: !isInvalid && isValidRefCode,
    isLoadingValidRefCode,
    hasReferral,
    isLoadingHasReferral,
    handleSetReferral,
  };
};
