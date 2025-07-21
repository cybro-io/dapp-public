import cexImg from './assets/cex.svg?url';
import dexImg from './assets/dex.svg?url';
import gateIoImg from './assets/gateio.svg?url';
import mexcImg from './assets/mexc.svg?url';
import pancakeImg from './assets/pancake.svg?url';
import CexCard from './CexCard';

const WhereToBuy = () => {
  return (
    <section className="max-w-[1440px] px-[12px] md:px-[30px] lg:pt-[85px] pt-[16px] pb-[70px] m-auto">
      <h2 className="text-center text-white text-2xl lg:text-6xl font-bold font-unbounded uppercase lg:leading-[72px]">
        Where to <br className="md:hidden" /> buy Cybro
      </h2>
      <h3 className="text-center mt-[14px] text-accent text-sm lg:text-3xl font-bold lg:font-medium font-unbounded uppercase leading-none lg:leading-10 tracking-wide">
        Available on trusted <br className="md:hidden" /> exchanges
      </h3>
      <div className="grid lg:grid-cols-[repeat(auto-fill,_minmax(380px,_1fr))] grid-cols-1 gap-[20px] mt-[40px]">
        <CexCard
          exchangeId="gate"
          name="Gate.io"
          link="https://www.gate.io/trade/CYBRO_USDT"
          img={gateIoImg}
        />
        <CexCard
          exchangeId="mxc"
          name="MEXC"
          link="https://www.mexc.com/exchange/CYBRO_USDT"
          img={mexcImg}
        />
        <CexCard
          name="Pancake"
          exchangeId="pancakeswap-v3-bsc"
          toCurrency="0XBB4CDB9CBD36B01BD1CBAEBF2DE08D9173BC095C"
          link="https://pancakeswap.finance/swap?outputCurrency=0x55d398326f99059fF775485246999027B3197955&inputCurrency=0xA9972b1fAC35fdd8cBdbaA315A002B2Ad91d2ad6"
          img={pancakeImg}
        />
      </div>
    </section>
  );
};

export default WhereToBuy;
