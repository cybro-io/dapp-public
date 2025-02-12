import { useCybroBalance } from '@/entities/Staking';
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

  const { balance, isLoadingBalance } = useCybroBalance(address);

  const cybroBalance = balance.locked + balance.cybro;

  return {
    cybroBalance,
    address,
    userProfile,
    earnedYield,
    isLoading: isLoadingEarnedYield || isLoadingUserProfile || isLoadingBalance,
  };
};
