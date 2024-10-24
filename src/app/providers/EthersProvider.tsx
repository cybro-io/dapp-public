'use client';

import React from 'react';

import { useWeb3ModalProvider } from '@web3modal/ethers5/react';
import { providers, ethers } from 'ethers';

import TOKEN from '@/app/abi/token.json';
import { useWeb3ModalAccount } from '@/shared/lib';
import { Maybe, Nullable, Token, Vault } from '@/shared/types';

interface EthersContextProps {
  provider: Nullable<providers.Provider>;
  signer: Nullable<ethers.Signer>;
  vaults: { [address: string]: Maybe<Vault> };
  tokens: { [vaultAddress: string]: Maybe<Token> };
  createVaultInstance: (
    vaultAddress: string,
    abi: any,
    vaultProvider: providers.StaticJsonRpcProvider,
    tokenAddress: string,
  ) => Promise<{ vault: Vault; token: Token | null }>;
  createTokenInstance: (
    tokenAddress: string,
    tokenProvider: providers.StaticJsonRpcProvider,
  ) => Token;
}

const EthersContext = React.createContext<EthersContextProps | undefined>(
  undefined,
);

export const EthersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { walletProvider } = useWeb3ModalProvider();
  const { isConnected } = useWeb3ModalAccount();

  const [provider, setProvider] =
    React.useState<Nullable<providers.Provider>>(null);
  const [signer, setSigner] = React.useState<Nullable<ethers.Signer>>(null);
  const [vaults, setVaults] = React.useState<{ [address: string]: Vault }>({});
  const [tokens, setTokens] = React.useState<{ [vaultAddress: string]: Token }>(
    {},
  );

  React.useEffect(() => {
    const getValues = async () => {
      if (isConnected && walletProvider) {
        const ethersProvider = new providers.Web3Provider(walletProvider);
        const signer = await ethersProvider.getSigner();

        setSigner(signer);
        setProvider(ethersProvider);
      }
    };

    getValues();
  }, [isConnected, walletProvider]);

  const createVaultInstance = React.useCallback(
    async (
      vaultAddress: string,
      abi: any,
      vaultProvider: providers.StaticJsonRpcProvider,
      tokenAddress: string,
    ) => {
      if (!isConnected) {
        throw new Error('Wallet is not connected');
      }

      if (!provider || !signer) {
        throw new Error('Provider or signer not initialized');
      }

      if (vaults[vaultAddress] && tokens[vaultAddress]) {
        return { vault: vaults[vaultAddress], token: tokens[vaultAddress] };
      }

      const vaultInstance = new ethers.Contract(
        vaultAddress,
        abi,
        vaultProvider,
      ) as unknown as Vault;

      setVaults((prevContracts) => ({
        ...prevContracts,
        [vaultAddress]: vaultInstance,
      }));

      const tokenInstance = tokenAddress
        ? createTokenInstance(tokenAddress, vaultProvider)
        : null;

      return { vault: vaultInstance, token: tokenInstance };
    },
    [isConnected, provider, signer, vaults, tokens],
  );

  const createTokenInstance = React.useCallback(
    (tokenAddress: string, tokenProvider: providers.StaticJsonRpcProvider) => {
      if (!isConnected) {
        throw new Error('Wallet is not connected');
      }

      if (tokens[tokenAddress]) {
        return tokens[tokenAddress];
      }

      const tokenInstance = new ethers.Contract(
        tokenAddress,
        TOKEN,
        tokenProvider,
      ) as unknown as Token;
      setTokens((prevContracts) => ({
        ...prevContracts,
        [tokenAddress]: tokenInstance,
      }));

      return tokenInstance;
    },
    [isConnected, provider, signer, tokens],
  );

  const contextValue = React.useMemo(
    () => ({
      provider,
      signer,
      vaults,
      tokens,
      createVaultInstance,
      createTokenInstance,
    }),
    [
      provider,
      signer,
      vaults,
      tokens,
      createVaultInstance,
      createTokenInstance,
    ],
  );

  return (
    <EthersContext.Provider value={contextValue}>
      {children}
    </EthersContext.Provider>
  );
};

export const useEthers = (): EthersContextProps => {
  const context = React.useContext(EthersContext);

  if (!context) {
    throw new Error('useEthers must be used within an EthersProvider');
  }
  return context;
};
