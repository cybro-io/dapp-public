import React from 'react';

import { useAppKitAccount } from '@/shared/lib';
import { useGetOrCreateRefCodeApiV1ProfileAddressRefcodePost } from '@/shared/types';

export const useGetReferralCode = () => {
  const { address } = useAppKitAccount();

  const { mutateAsync, isPending } =
    useGetOrCreateRefCodeApiV1ProfileAddressRefcodePost();

  const [referralCode, setReferralCode] = React.useState<string | null>(null);

  React.useLayoutEffect(() => {
    if (!address) {
      return;
    }

    mutateAsync({ address }).then(({ data }) => {
      if (!data.data) {
        return;
      }

      setReferralCode(data.data.ref_code);
    });
  }, [address]);

  return { referralCode, isPending };
};
