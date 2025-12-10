'use client';

import { useEffect, useState } from 'react';

export type ExchangeId =
  | 'gate'
  | 'binance'
  | 'coinbase'
  | 'thruster-v2-0-3-fee-tier'
  | 'mxc'
  | 'bingx'
  | 'pancakeswap-v3-bsc';

interface ConvertedLast {
  btc: number;
  eth: number;
  usd: number;
}

interface ConvertedVolume {
  btc: number;
  eth: number;
  usd: number;
}

interface Market {
  name: string;
  identifier: string;
  has_trading_incentive: boolean;
}

interface TradingData {
  base: string;
  target: string;
  market: Market;
  last: number;
  volume: number;
  converted_last: ConvertedLast;
  converted_volume: ConvertedVolume;
  trust_score: string;
  bid_ask_spread_percentage: number;
  timestamp: string;
  last_traded_at: string;
  last_fetch_at: string;
  is_anomaly: boolean;
  is_stale: boolean;
  trade_url: string;
  token_info_url: string | null;
  coin_id: string;
  target_coin_id: string;
}

export const useGetTickersById = (id: ExchangeId, target: string = 'USDT') => {
  const [data, setData] = useState<TradingData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      fetch(
        `https://pro-api.coingecko.com/api/v3/exchanges/${id}/tickers?coin_ids=cybro`,
        {
          headers: {
            accept: 'application/json',
            'x-cg-pro-api-key': process.env.NEXT_PUBLIC_COINGECKO_KEY || '',
          },
        },
      )
        .then((response) => response.json())
        .then((response) => {
          const result: TradingData | undefined = response?.tickers?.find(
            ({ target: t }: any) => t === target,
          );
          setData(result);
        });
    } catch (error) {
      console.error('Error fetching holders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  return { data, isLoading };
};
