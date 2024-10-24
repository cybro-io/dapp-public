import { ChainId } from 'symbiosis-js-sdk';

interface SymbiosisTransactionRoute {
  chain_id: ChainId;
  amount: number;
  token: {
    address: string;
    decimals: number;
    name: string;
    symbol: string;
  };
}

export interface SymbiosisTransaction {
  id: number;
  hash: string;

  created_at: string;
  mined_at: string | null;
  success_at: string | null;

  from_address: string;
  from_route: Array<SymbiosisTransactionRoute>;
  from_chain_id: ChainId;

  to_address: string;
  to_route: Array<SymbiosisTransactionRoute>;
  to_chain_id: ChainId;
}
