import { ethers, Signer } from 'ethers';

import vaultErc4626Abi from '@/app/abi/vault.json';
import vaultDexAbi from '@/app/abi/vaultDex.json';
import vaultOneClickAbi from '@/app/abi/vaultOneClick.json';
import { FundType, Vault, VaultDex, VaultOneClick } from '@/shared/types';

export const createVaultContract = <T extends FundType>(
  vaultAddress: string,
  fundType: T,
  signerOrProvider?: Signer | ethers.providers.Provider,
) => {
  const abi: Record<FundType, unknown> = {
    [FundType.dex]: vaultDexAbi,
    [FundType.erc4626]: vaultErc4626Abi,
    [FundType.oneClick]: vaultOneClickAbi,
  };

  return new ethers.Contract(
    vaultAddress,
    abi[fundType] as string,
    signerOrProvider,
  ) as T extends FundType.dex
    ? VaultDex
    : T extends FundType.oneClick
      ? VaultOneClick
      : Vault;
};
