import { useAddWalletApiV1ProfileAddressPut } from '@/shared/types';

export const useAuthWallet = () => {
  const { mutateAsync } = useAddWalletApiV1ProfileAddressPut({
    mutation: {},
  });

  const authWallet = async (address: string) =>
    mutateAsync({ address }).catch(console.error);

  return { authWallet };
};
