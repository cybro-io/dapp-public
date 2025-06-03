import { useAddWalletApiV1ProfileAddressPut } from '@/shared/types';

export const useAuthWallet = () => {
  const { mutateAsync } = useAddWalletApiV1ProfileAddressPut({
    mutation: {},
  });

  const authWallet = async (address: string, chainId: number) =>
    mutateAsync({ address, params: { chain_id: chainId } }).catch(
      console.error,
    );

  return { authWallet };
};
