import { Chain } from 'viem';
import { blast } from 'viem/chains';

type ExchangePaymentMethodCrypto = {
  isCrypto: true;
  address: string;
  chain: Chain;
  name: string;
  tokenIcon: string;
  chainIcon: string;
};

type ExchangePaymentMethodFiat = {
  isCrypto: false;
  tokenIcon: string;
  name: string;
};

export type ExchangePaymentMethodType =
  | ExchangePaymentMethodCrypto
  | ExchangePaymentMethodFiat;

export const exchangePaymentMethods: Array<ExchangePaymentMethodType> = [
  {
    isCrypto: true,
    name: 'USDB',
    address: '0x4300000000000000000000000000000000000003',
    tokenIcon: 'https://linkee.ws/7/Z/7ZMKY2RpyavKJb83AVJ8xg.png',
    chainIcon: 'https://blastscan.io/token/images/blast_32.png',
    chain: blast,
  },
  {
    isCrypto: true,
    name: 'WETH',
    address: '0x4300000000000000000000000000000000000004',
    tokenIcon: 'https://icons-ckg.pages.dev/stargate-light/tokens/weeth.svg',
    chainIcon: 'https://blastscan.io/token/images/blast_32.png',
    chain: blast,
  },
  // {
  //   isCrypto: false,
  //   name: 'Bank Card',
  // },
];
