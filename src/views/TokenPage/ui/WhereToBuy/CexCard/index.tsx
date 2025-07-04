'use client';

import Image, { StaticImageData } from 'next/image';

import {
  ExchangeId,
  useGetTickersById,
} from '@/entities/ticker/model/useGetTickersById';
import { shortNumber } from '@/shared/utils';

import cybroIcon from '../assets/cybro.svg?url';
import usdtIcon from '../assets/usdt.svg?url';

import styles from './styles.module.css';

type CardProps = {
  name: string;
  link: string;
  toCurrency?: string;
  img: StaticImageData;
  exchangeId: ExchangeId;
  comingSoon?: boolean;
};

const CexCard = ({
  name,
  link,
  img,
  exchangeId,
  toCurrency,
  comingSoon,
}: CardProps) => {
  const { data, isLoading } = useGetTickersById(exchangeId, toCurrency);

  return (
    <div
      className={`relative rounded-2xl p-[18px] lg:pb-8 lg:pt-10 lg:px-[58px] flex flex-col gap-4 ${styles.cardbg}`}
    >
      {comingSoon ? (
        <div className={styles.comingSoonBg}>
          <p className="absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] bg-black text-accent uppercase font-semibold px-4 py-3 rounded-[40px]">
            Coming Soon
          </p>
        </div>
      ) : null}
      <div
        className={`bg-[#1A1B25] rounded-2xl p-2 pt-6 flex flex-col gap-4  ${
          comingSoon ? 'blur-md' : null
        }`}
      >
        <div className="flex text-[#CCC3EE] items-center gap-2.5 px-4 font-unbounded font-light text-[27px] uppercase">
          <Image src={img} alt={name} className="w-[45px] h-[45px]" />
          <p className="opacity-40">{name}</p>
        </div>
        <div className="bg-[#11121A] px-4 py-[26px] rounded-[10px] flex flex-col gap-2 font-medium text-white">
          <div className="flex items-end gap-1">
            <p className="opacity-60 flex-shrink-0">Price</p>
            <p className="text-[#3A3B45] text-xs font-bold overflow-hidden whitespace-nowrap">
              _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
            </p>
            <p className="flex-shrink-0">
              {!isLoading && data ? (
                `${data?.converted_last.usd.toFixed(3)} USDT`
              ) : (
                <span className="w-[80px] h-[20px] animate-[skeleton_2s_cubic-bezier(.4,0,.6,1)_infinite] rounded-md bg-white opacity-20 block" />
              )}
            </p>
          </div>
          <div className="flex items-end gap-1">
            <Image src={cybroIcon} alt="cybroIcon" />
            <p className="opacity-60 flex-shrink-0">24h Quantity</p>
            <p className="text-[#3A3B45] text-xs font-bold overflow-hidden whitespace-nowrap">
              _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
            </p>
            <p className="flex-shrink-0">
              {' '}
              {!isLoading && data ? (
                shortNumber(data?.volume || 0)
              ) : (
                <span className="w-[80px] h-[20px] animate-[skeleton_2s_cubic-bezier(.4,0,.6,1)_infinite] rounded-md bg-white opacity-20 block" />
              )}
            </p>
          </div>
          <div className="flex items-end gap-1">
            <Image src={usdtIcon} alt="usdtIcon" />
            <p className="opacity-60 flex-shrink-0">24h Total</p>
            <p className="text-[#3A3B45] text-xs font-bold overflow-hidden whitespace-nowrap">
              _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
            </p>
            <p className="flex-shrink-0">
              {' '}
              {!isLoading && data ? (
                shortNumber(data?.converted_volume.usd || 0)
              ) : (
                <span className="w-[80px] h-[20px] animate-[skeleton_2s_cubic-bezier(.4,0,.6,1)_infinite] rounded-md bg-white opacity-20 block" />
              )}
            </p>
          </div>
        </div>
      </div>
      <a href={link} target="_blank" rel="noreferrer">
        <button
          className={`button button--yellow button--arrow access__btn w-full ${
            comingSoon ? 'blur-md' : null
          }`}
        >
          Trade on {name}
        </button>
      </a>
    </div>
  );
};

export default CexCard;
