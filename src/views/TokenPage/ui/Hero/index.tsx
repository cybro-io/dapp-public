import Image from 'next/image';

import { socialLinks } from '@/shared/lib';

import certic from './assets/certic.svg?url';
import discord3 from './assets/discord-3.svg?url';
import cybroImg from './assets/main-bg-1-desk.svg?url';
import medium from './assets/medium.svg?url';
import tg from './assets/tg-1.svg?url';
import twitter3 from './assets/twitter-3.svg?url';
import styles from './styles.module.scss';

export const TokenHero = () => {
  const validators = [
    {
      link: 'https://skynet.certik.com/projects/cybro',
      img: certic,
      alt: 'skynet certik',
    },
  ];

  const socials = [
    {
      link: socialLinks.x,
      img: twitter3,
      alt: 'twitter',
      height: 25,
    },
    {
      link: socialLinks.discord,
      img: discord3,
      alt: 'discord',
      height: 25,
    },
    {
      link: socialLinks.telegram,
      img: tg,
      alt: 'telegram',
      height: 25,
    },
    {
      link: socialLinks.medium,
      img: medium,
      alt: 'medium',
      height: 40,
    },
  ];

  return (
    <section className={styles.bg}>
      <div className="max-w-[1440px] px-[12px] md:px-[30px] lg:pt-[85px] pt-[16px] pb-[70px] m-auto relative">
        <Image
          src={cybroImg}
          alt="cybroImg"
          className="absolute left-[-80px] right-0 md:top-[20px] top-[100px] max-w-max w-[120vw] h-auto"
        />
        <div className="flex flex-col items-center md:items-start">
          <div
            className="relative mb-[9px] lg:mb-[13px] px-[5px] md:px-[14.75px] py-[1.48px] bg-gradient-to-br from-white to-[#6b6c78] rounded-2xl backdrop-blur-[153.41px] justify-center items-center gap-[14.75px] inline-flex"
            style={{
              background:
                'linear-gradient(148deg, rgba(255, 255, 255, 0.10) 0%, rgba(107.50, 108.81, 120.66, 0.07) 100%)',
            }}
          >
            <div className="absolute w-[364px] md:w-[394px] h-full opacity-25 bg-[#fbff3a] rounded-full blur-[150px]" />
            <div className="absolute w-[180px] h-[50%] opacity-30 bg-[#fbff3a] rounded-full blur-[68.71px]" />
            <div className="text-[#fbff3a] text-[36px] lg:text-[105px] font-semibold font-unbounded uppercase leading-[67px] lg:leading-[126px]">
              Cybro token
            </div>
          </div>

          <h2 className={`${styles.subtitle} !hidden md:!flex`}>
            Your gateway to digital growth
          </h2>

          <h2 className={`${styles.subtitle} md:!hidden`}>Your gateway</h2>
          <h2 className={`${styles.subtitle} md:!hidden mt-[3px]`}>
            to digital growth
          </h2>

          <h1
            className={
              'md:mt-[36px] mt-[22px] shop__desc !text-white/60 font-medium leading-[26px] !max-w-[300px] md:!max-w-[390px] !text-[13px] text-center md:text-left lg:!text-base'
            }
          >
            The CYBRO Token is the utility token of the CYBRO multichain earn
            marketplace. It gives you lower fees, higher returns on curated
            strategies, access to premium features, and a role in governance.
          </h1>
        </div>

        <div className="flex justify-between flex-wrap-reverse lg:mt-[140px] mt-[340px] gap-11">
          <div className="flex flex-col items-center md:items-start w-full md:w-auto">
            <p className="!text-white/60 mb-[12px] text-[13px] md:text-[16px]">
              Join The Community
              <br className="hidden md:block" /> of{' '}
              <span className="text-white">18246</span> CYBRO-Holders
            </p>
            <div className="flex gap-2.5">
              {socials.map(({ link, img, alt, height }, index) => (
                <a
                  href={link}
                  target={'_blank'}
                  key={index}
                  className="bg-[#1A1B25] rounded-[11px] flex items-center justify-center md:w-[76px] md:h-[61px] w-[50px] h-[40px]"
                  rel="noreferrer"
                >
                  <Image
                    src={img}
                    alt={alt}
                    style={{ height }}
                    className="w-auto scale-75 md:scale-100"
                  />
                </a>
              ))}
            </div>
          </div>
          <div className="md:w-fit w-full">
            <p className="md:hidden text-[13px] text-[#707176] text-center mb-[14px] font-medium">
              Verified by Professional Auditors
            </p>
            <div className="flex gap-3 items-end flex-wrap justify-center md:justify-start">
              {validators.map(({ link, img, alt }, index) => (
                <a
                  href={link}
                  className={styles.validator}
                  key={index}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    width={144}
                    height={61}
                    src={img}
                    alt={alt}
                    className="w-[162px] h-auto md:w-[144px]"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
