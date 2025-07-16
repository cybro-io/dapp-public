import Image from 'next/image';

import kurwaImg from './assets/kurwa.webp';
import kurwaMobileImg from './assets/kurwaMobile.webp';
import styles from './styles.module.css';

export const TokenUtility = () => {
  const itemsListLeft = [
    {
      title: 'Fee Discounts',
      description:
        'Token holders enjoy reduced fees across the platform, including deposit, withdrawal, and performance fees. The discount levels depend on the holder’s CYBRO Tier.',
    },
    {
      title: 'Enhanced Yields',
      description:
        'Access higher returns on specific strategies, such as the "One-Click" investment.',
    },
    {
      title: 'Premium Features',
      description:
        'Unlock exclusive CYBRO premium tools, including the cutting-edge AI Broker.',
    },
  ];

  const itemsListRight = [
    {
      title: 'Governance Participation',
      description:
        'Participate in protocol governance, influencing key decisions about the platform’s future.',
    },
    {
      title: 'Additional Rewards',
      description:
        'Earn extra rewards through CYBRO-specific activities and usage.',
    },
  ];
  return (
    <section className="max-w-[1440px] px-[12px] md:px-[30px] lg:pt-[85px] pt-[16px] pb-[70px] m-auto">
      <div className={styles.bg}>
        <Image
          src={kurwaImg}
          alt="kurwa"
          className="absolute bottom-0 left-auto right-0 h-[580px] !w-auto hidden lg:block"
        />
        <Image
          src={kurwaMobileImg}
          alt="kurwa"
          className="absolute bottom-0 left-[50%] translate-x-[-50%] right-0 h-[380px] !w-auto lg:hidden"
        />
        <h2 className="text-white text-2xl lg:text-6xl font-bold text-center lg:text-start font-unbounded uppercase lg:leading-[72px]">
          <span className="hidden lg:inline">UTILITY OF</span>
          <br /> CYBRO TOKEN
        </h2>
        <div className="flex lg:gap-[54px] items-start mt-[40px] justify-center lg:justify-start lg:mr-[360px] flex-wrap lg:pb-0 pb-[380px] gap-[20px]">
          <div className="flex flex-col gap-[20px] max-w-[335px]">
            {itemsListLeft.map(({ title, description }, index) => (
              <div className="flex gap-[12px]" key={index}>
                <Checkmark className="flex-shrink-0" />
                <div className="flex gap-[10px] flex-col">
                  <p className="font-medium">{title}</p>
                  <p className="opacity-70">{description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-[20px] max-w-[335px]">
            {itemsListRight.map(({ title, description }, index) => (
              <div className="flex gap-[12px]" key={index}>
                <Checkmark className="flex-shrink-0" />
                <div className="flex gap-[10px] flex-col">
                  <p className="font-medium">{title}</p>
                  <p className="opacity-70">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Checkmark = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="25"
    height="19"
    viewBox="0 0 25 19"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.3916 8.93572L7.73931 5.60453L0 5.60453L8.85825 16.1445L8.89408 16.1018L10.309 17.79L25.0003 1.00024H17.261L10.3916 8.93572Z"
      fill="#FBFF3A"
    />
  </svg>
);
