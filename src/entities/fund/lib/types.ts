export interface SelectedTokenCrypto {
  isCrypto: true;

  address: string;
  symbol: string;
  decimals: number;
  logoUrl: string;

  chain: {
    id: number;
    logoUrl: string;
    name: string;
    explorer?: string;
  };
}

export interface SelectedTokenFiat {
  isCrypto: false;
  symbol: string;
  decimals: number;
  logoUrl: string;
  id: number;
  name: string;
}

export type SelectedToken = SelectedTokenCrypto | SelectedTokenFiat;
