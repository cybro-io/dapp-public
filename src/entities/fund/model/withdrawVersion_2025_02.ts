import { getChainById } from '@lifi/data-types';
import { BigNumberish, utils } from 'ethers';

import {
  createFeeProviderContract,
  createMulticallContract,
} from '@/shared/lib';
import {
  getSignatureApiV1StakingSignatureAddressGet,
  VaultVersion_2025_02,
} from '@/shared/types';
import { increaseGasLimit } from '@/shared/utils';

interface IWithdrawVersion_2025_02VaultProps {
  vaultContract: VaultVersion_2025_02;
  walletAddress: string;
  tokenAddress: string;
  amount: BigNumberish;
}

export const withdrawVersion_2025_02 = async ({
  vaultContract,
  walletAddress,
  amount,
}: IWithdrawVersion_2025_02VaultProps) => {
  const signer = vaultContract.signer;

  const chainId = await signer.getChainId();
  const chain = getChainById(chainId);
  const multicallAddress = chain.multicallAddress;

  if (!multicallAddress) {
    throw new Error('multicallAddress not found.');
  }

  const feeProviderAddress = await vaultContract.feeProvider();

  const feeProviderContract = createFeeProviderContract(
    feeProviderAddress,
    signer,
  );

  const multicallContract = createMulticallContract(multicallAddress, signer);

  const {
    data: {
      data: { deadline, signature, staked_amount },
    },
  } = await getSignatureApiV1StakingSignatureAddressGet(walletAddress);
  const signatureHex = utils.hexValue(`0x${signature}`);

  const minAssetsWei = '0';

  const allowance = await vaultContract.allowance(
    walletAddress,
    multicallContract.address,
  );

  if (allowance.lt(amount)) {
    const approveTx = await vaultContract.approve(
      multicallContract.address,
      amount,
    );
    await approveTx.wait();
  }

  const params = [
    {
      target: feeProviderContract.address,
      allowFailure: false,
      callData: feeProviderContract.interface.encodeFunctionData(
        'setStakedAmount',
        [
          walletAddress,
          staked_amount.toString(),
          deadline.toString(),
          signatureHex,
        ],
      ),
    },
    {
      target: vaultContract.address,
      allowFailure: false,
      callData: vaultContract.interface.encodeFunctionData('redeem', [
        amount.toString(),
        walletAddress,
        walletAddress,
        minAssetsWei.toString(),
      ]),
    },
  ];

  const estimateGas = await multicallContract.estimateGas.aggregate3(params);
  const gasLimit = increaseGasLimit(estimateGas, 1.35);

  const tx = await multicallContract.aggregate3(params, {
    gasLimit,
  });

  await tx.wait();

  return tx;
};
