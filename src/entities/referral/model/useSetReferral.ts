import { useAppKitProvider } from '@reown/appkit/react';
import { useMutation } from '@tanstack/react-query';
import { providers } from 'ethers';

import { AnalyticsEvent, track } from '@/shared/analytics';
import {
  getMsgToSignApiV1ProfileAddressRefcodeRefCodeGet,
  setReferrerApiV1ProfileAddressRefcodeRefCodePost,
} from '@/shared/types';

interface SetReferralData {
  address: string;
  refCode: string;
}

export const useSetReferral = () => {
  const { walletProvider } = useAppKitProvider('eip155');

  return useMutation<void, Error, SetReferralData>({
    onSuccess: (_data, variables) => {
      track.event(AnalyticsEvent.ReferralCodeConfirmed, variables);
    },
    onError: (_data, variables) => {
      track.event(AnalyticsEvent.ReferralCodeFailed, variables);
    },
    mutationFn: async (data) => {
      if (!walletProvider) {
        throw new Error('Wallet provider is not available');
      }

      const signer = new providers.Web3Provider(walletProvider).getSigner();

      const responseSignature =
        await getMsgToSignApiV1ProfileAddressRefcodeRefCodeGet(
          data.address,
          data.refCode,
        );

      if (!responseSignature.data.data || !responseSignature.data.ok) {
        throw new Error('Unable to get referral data');
      }

      const signature = await signer.signMessage(responseSignature.data.data);

      const setReferrerResponse =
        await setReferrerApiV1ProfileAddressRefcodeRefCodePost(
          data.address,
          data.refCode,
          { signature },
        );

      if (!setReferrerResponse.data.ok) {
        throw new Error(setReferrerResponse.data.error ?? 'Unknown error');
      }
    },
  });
};
