import { ethers, Signer } from 'ethers';

import vaultErc4626Abi from '@/shared/abi/vault.json';
import vaultDexAbi from '@/shared/abi/vaultDex.json';
import vaultOneClickAbi from '@/shared/abi/vaultOneClick.json';
import vaultVersion_2025_02 from '@/shared/abi/vaultVersion_2025_02.json';
import {
  FundType,
  Vault,
  VaultDex,
  VaultOneClick,
  VaultVersion_2025_02,
} from '@/shared/types';

export const createVaultContract = <T extends FundType>(
  vaultAddress: string,
  fundType: T,
  signerOrProvider?: Signer | ethers.providers.Provider,
) => {
  const abi: Record<FundType, unknown> = {
    [FundType.dex]: vaultDexAbi,
    [FundType.erc4626]: vaultErc4626Abi,
    [FundType.oneClick]: vaultOneClickAbi,
    [FundType.version2025_02]: vaultVersion_2025_02,
    [FundType.version2025_04]: vaultVersion_2025_02,
  };

  return new ethers.Contract(
    vaultAddress,
    abi[fundType] as string,
    signerOrProvider,
  ) as T extends FundType.dex
    ? VaultDex
    : T extends FundType.oneClick
      ? VaultOneClick
      : T extends FundType.version2025_02 | FundType.version2025_04
        ? VaultVersion_2025_02
        : Vault;
};
