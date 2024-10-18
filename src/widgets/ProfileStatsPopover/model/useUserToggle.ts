import { useWeb3ModalAccount } from '@/shared/lib';
import {
  useGetProfileApiV1ProfileAddressGet,
  useGetProfileEarnedYieldApiV1ProfileAddressEarnedYieldGet,
} from '@/shared/types';

export const useUserToggle = () => {
  const { address } = useWeb3ModalAccount();

  const { data: userProfile, isLoading: isLoadingUserProfile } =
    useGetProfileApiV1ProfileAddressGet(address!, {
      query: {
        enabled: Boolean(address),
        select: (data) => data.data.data,
      },
    });

  const { data: earnedYield, isLoading: isLoadingEarnedYield } =
    useGetProfileEarnedYieldApiV1ProfileAddressEarnedYieldGet(address!, {
      query: {
        enabled: Boolean(address),
        select: (data) => data.data.data,
      },
    });

  return {
    address,
    userProfile,
    earnedYield,
    isLoading: isLoadingEarnedYield || isLoadingUserProfile,
  };
};
