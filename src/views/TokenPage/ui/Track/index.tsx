import Image from 'next/image';

import blast from './assets/blast.svg?url';
import coingecko from './assets/coingecko.svg?url';
import coinmarketcap from './assets/coinmarketcap.svg?url';

export const TokenTrack = () => {
  return (
    <section className="max-w-[1440px] px-[12px] md:px-[30px] lg:pt-[85px] pt-[16px] pb-[70px] m-auto">
      <h2 className="text-center text-white leading-[72px] text-2xl lg:text-6xl font-bold font-unbounded uppercase lg:leading-[72px]">
        Track Cybro
      </h2>
      <h3 className="text-center mt-[14px] text-accent text-sm lg:text-3xl font-bold lg:font-medium font-unbounded uppercase lg:leading-10 tracking-wide">
        Stay updated on the <br /> pulse of the market
      </h3>

      <div className="mt-[52px] flex gap-[20px] uppercase text-[20px] justify-center flex-col lg:flex-row">
        <a
          href="https://www.coingecko.com/en/coins/cybro"
          target={'_blank'}
          className="px-[30px] h-[85px] justify-center lg:h-[96px] rounded-[22px] bg-[#1A1B25] transition-all hover:brightness-110 flex items-center gap-[20px]"
          rel="noreferrer"
        >
          <Image
            src={coingecko}
            alt={'coingecko'}
            className="w-[48px] h-auto"
          />
          <span>Coingecko</span>
        </a>
        <a
          href="https://coinmarketcap.com/currencies/cybro/"
          target={'_blank'}
          className="px-[30px] h-[85px] justify-center lg:h-[96px] rounded-[22px] bg-[#1A1B25] transition-all hover:brightness-110 flex items-center gap-[20px]"
          rel="noreferrer"
        >
          <Image
            src={coinmarketcap}
            alt={'coinmarketcap'}
            className="w-[48px] h-auto"
          />
          <span>Coinmarketcap</span>
        </a>
      </div>
    </section>
  );
};
