import React from 'react';

import './governance.scss';

import Image from 'next/image';

import Avatars from '../lib/assets/avatars.png';
import GovernanceCardBg from '../lib/assets/governance-card-bg.png';
import GovernanceKurwaBg from '../lib/assets/governance-kurwa-bg.png';
import GovernanceKurwaCard from '../lib/assets/governance-kurwa-card.png';
import GovernaneKurwaSmallBg from '../lib/assets/governance-kurwa-mobile-bg.png';
import GovernanceMoneyMobile from '../lib/assets/governance-money-mobile.png';
import GovernanceRectBg from '../lib/assets/governance-rect-bg.png';

export const GovernancePage = () => {
  return (
    <React.Fragment>
      <div className="bg relative mt-5 governance:mt-[68px] pb-[77px] governance:pb-[136px] flex items-center flex-col w-full">
        <HeroHeading />
        <CybroHeading />
        <DescriptionHeading />
        <ButtonsHeading />
      </div>

      <div className="mt-[36px] items-center flex-col w-full gap-10">
        <div className="flex flex-col gap-2.5 items-center">
          <div className="w-full max-w-[856px] h-[30px] governance:h-[85px] relative">
            <div className="hidden governance:block w-[474px] h-[21px] left-[76px] top-[37px] absolute opacity-25 bg-[#fbff3a] rounded-full blur-[100px]" />
            <div className="left-0 top-0 right-0 text-center absolute">
              <span className="text-[#fbff3a] text-[25px] governance:text-[70.82px] font-semibold font-unbounded uppercase leading-[30px] governance:leading-[84.98px]">
                GOVERNANCE
              </span>
              <span className="text-white text-[25px] governance:text-[70.82px] font-semibold font-unbounded uppercase leading-[30px] governance:leading-[84.98px]">
                {' '}
                HUB
              </span>
            </div>
          </div>

          <div className="w-full max-w-[335px] governance:max-w-[623px] text-center text-white text-base governance:text-lg font-normal governance:font-medium font-poppins leading-[27px]">
            CYBRO DAO is a decentralized model allowing token holders to
            directly influence major initiatives and strategic decisions. From
            project approvals to ecosystem funding, every vote matters.
          </div>
        </div>

        <div className="relative mt-10 flex governance:flex-row flex-col justify-center governance:gap-0 gap-[45px] governance:items-start items-center governance:py-0 py-[30px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="335"
            height="825"
            viewBox="0 0 335 825"
            fill="none"
            className="governance:hidden block absolute top-0 left-0 right-0 mx-auto"
          >
            <mask
              id="mask0_5992_26774"
              style={{ maskType: 'alpha' }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="335"
              height="825"
            >
              <path
                d="M0 0H305.211L335 32.8922V825H29.3003L0 792.647L0 0Z"
                fill="black"
              />
            </mask>
            <g mask="url(#mask0_5992_26774)">
              <rect x="-3.35938" width="337.93" height="825" fill="black" />
            </g>
          </svg>

          <HubCard
            title="Proposals & Voting"
            description="Submit ideas, engage in discussions, and cast your vote on key initiatives. CYBRO DAO ensures your voice is always part of the conversation."
            url="https://vote.cybro.io/"
            isBlack={true}
          />
          <HubCard
            title="Coordinated Execution"
            description="Our governance team ensures that approved initiatives are executed effectively, keeping transparency and community vision at the forefront."
            url="https://vote.cybro.io/#/"
            isBlack={false}
          />
          <HubCard
            title="Ecosystem Development"
            description="Unlock funding and resources for projects that bring innovation and value to CYBRO. Together, we drive impactful change within the blockchain industry."
            url="https://vote.cybro.io/#/"
            isBlack={true}
          />
        </div>
      </div>

      <CommunityBlock />

      <VoteNowBlock />
    </React.Fragment>
  );
};

function HeroHeading() {
  return (
    <div className="hero-heading h-[30px] governance:h-[87px] px-1.5 py-0.5 governance:px-2.5 governance:py-px rounded-[11px] backdrop-blur-[104px] justify-center items-center gap-2.5 inline-flex">
      <div className="text-white text-[22px] governance:text-[70.82px] font-semibold font-unbounded uppercase leading-relaxed governance:leading-[84.98px]">
        Shape the future of
      </div>
    </div>
  );
}

const CybroHeading = () => {
  return (
    <React.Fragment>
      <div className="governance:block hidden governance:mt-[18px] w-[495.50px] h-[155px] relative">
        <div className="w-[394px] h-[155px] left-[39px] top-0 absolute opacity-25 bg-[#fbff3a] rounded-full blur-[150px]" />
        <div className="w-[180px] h-[71px] left-[146px] top-[42px] absolute opacity-30 bg-[#fbff3a] rounded-full blur-[68.71px]" />
        <div className="h-[128.95px] px-[14.75px] py-[1.48px] left-0 top-[15px] absolute bg-gradient-to-br hero-heading rounded-2xl backdrop-blur-[153.41px] justify-center items-center gap-[14.75px] inline-flex">
          <div className="text-[#fbff3a] text-[105px] font-semibold font-unbounded uppercase leading-[126px]">
            cybro
          </div>
        </div>
      </div>

      <div className="governance:hidden mt-2.5 h-[47.08px] px-[5.40px] py-[0.54px] bg-gradient-to-br hero-heading rounded-md backdrop-blur-[56.12px] justify-center items-center gap-[5.40px] inline-flex">
        <div className="text-[#fbff3a] text-[38.41px] font-semibold font-unbounded uppercase leading-[46.09px]">
          Cybro
        </div>
      </div>
    </React.Fragment>
  );
};

const DescriptionHeading = () => {
  return (
    <div className="mt-[195px] governance:mt-[27px] max-w-[335px] governance:max-w-[567px] text-center text-white/60 text-[13px] governance:text-base font-medium font-poppins  leading-tight governance:leading-relaxed">
      CYBRO invites its community to actively participate in decisions that
      shape the ecosystem’s future. Collaborate, vote, and take part in the
      journey to create a sustainable and transparent blockchain platform
    </div>
  );
};

const ButtonsHeading = () => {
  return (
    <div className="mt-[57px] flex governance:gap-[30px] justify-center gap-2.5 flex-wrap">
      <a
        target="_blank"
        href="https://forum.cybro.io/"
        className={
          'w-full max-w-[335px] governance:w-auto button button--yellow button--arrow cybro__buy'
        }
        rel="noreferrer"
      >
        Join Discussions
      </a>

      <a
        target="_blank"
        href="https://vote.cybro.io/#/"
        className={
          'w-full max-w-[335px] governance:w-auto button button--yellow button--arrow'
        }
        rel="noreferrer"
      >
        Cast your vote
      </a>
    </div>
  );
};

interface HubCardProps {
  title: string;
  description: string;
  url: string;
  isBlack: boolean;
}

const HubCard = ({ title, description, url, isBlack = true }: HubCardProps) => {
  return (
    <div className="corner-rect" data-isBlack={isBlack}>
      <div className="max-w-[287px] governance:max-w-[337px] h-full governance:h-[272px] flex-col justify-start governance:justify-center items-start governance:gap-7 gap-5 inline-flex">
        <div className="self-stretch flex-col justify-start items-start gap-3.5 flex">
          <div className="self-stretch text-white text-[20px] governance:text-3xl font-bold font-unbounded">
            {title}
          </div>
          <div className="self-stretch text-white/60 text-[13px] governance:text-[15px] font-normal font-unbounded tracking-tight">
            {description}
          </div>
        </div>
        <a
          href={url}
          target="_blank"
          className={'button button--black button--arrow--white'}
          rel="noreferrer"
        >
          Learn More
        </a>
      </div>
    </div>
  );
};

const VoteNowBlock = () => {
  return (
    <React.Fragment>
      <div className="hidden governance:block mx-auto w-[1330px] h-[790px] relative bg-[#11121a]">
        <div className="w-[1294px] h-[657px] top-[133px] absolute">
          <div className="z-20 left-[103px] top-[97px] absolute flex-col justify-start items-start gap-[30px] inline-flex">
            <div className="flex-col justify-start items-start gap-2.5 flex">
              <div className="w-[560px] flex flex-col">
                <span className="text-white text-6xl font-black font-unbounded uppercase leading-[66px]">
                  BE PART OF SOMETHING
                </span>
                <span className="text-[#fbff3a] text-6xl font-black font-unbounded uppercase leading-[66px]">
                  BIGGER
                </span>
              </div>
              <div className="w-[425px] text-white text-lg font-normal font-poppins leading-[30.60px]">
                Engage in meaningful conversations, vote on proposals, and be a
                part of the transformation. CYBRO DAO is your gateway to
                building the future of decentralized platforms.
              </div>
            </div>
            <a
              target="_blank"
              href="https://vote.cybro.io/#/"
              className={'button button--arrow button--yellow'}
              rel="noreferrer"
            >
              Vote now
            </a>
          </div>
        </div>

        <Image
          className="w-[741px] z-10 h-[451px] left-[589px] top-[269px] absolute"
          src={GovernanceKurwaCard}
          alt="gov_kurwa-card"
        />

        <Image
          className="absolute z-[9] right-[86px] bottom-0 top-0 my-auto"
          src={GovernanceRectBg}
          alt="gov_rec-bg"
        />

        <Image
          className="w-[1294] h-[546px] left-0 right-0 mx-auto top-[173px] absolute"
          src={GovernanceCardBg}
          alt="card_bg"
        />

        <div className="w-[647px] left-[396px] top-[45px] absolute text-center text-[#fbff3a] text-3xl font-medium font-unbounded uppercase leading-[45.59px] tracking-wide">
          Your voice is the foundation of CYBRO’s success
        </div>
      </div>

      <div className="governance:hidden flex justify-center mx-auto w-full max-w-[375px] h-[737px] px-5 py-[50px] bg-[#11121a] flex-col items-center gap-[25px]">
        <div className="self-stretch text-center text-[#fbff3a] text-lg font-medium font-unbounded uppercase leading-snug tracking-tight">
          Your voice is the foundation of CYBRO’s success
        </div>
        <div className="w-[335px] h-[546px] relative flex-col justify-start items-start flex">
          <div className="w-full h-[459px] relative">
            <Image
              className="absolute z-[9] mx-auto left-0 right-0 top-[251px]"
              width={224}
              height={127}
              src={GovernanceRectBg}
              alt="rect-bg-gov"
            />
            <div className="h-[185px] left-0 right-0 top-10 absolute flex-col justify-center items-center gap-2.5 inline-flex">
              <div className="w-[268px] text-center">
                <span className="text-white text-[25px] font-black font-unbounded uppercase leading-[30px]">
                  BE PART OF SOMETHING{' '}
                </span>
                <span className="text-[#fbff3a] text-[25px] font-black font-unbounded uppercase leading-[30px]">
                  BIGGER
                </span>
              </div>
              <div className="w-[268px] text-center text-white text-[13px] font-medium font-poppins leading-[16.90px]">
                Engage in meaningful conversations, vote on proposals, and be a
                part of the transformation. CYBRO DAO is your gateway to
                building the future of decentralized platforms.
              </div>
            </div>

            <a
              target="_blank"
              href="https://vote.cybro.io/#/"
              className="button button--arrow button--yellow !absolute left-0 right-0 mx-auto bottom-[-34px] max-w-[256px] z-20"
              rel="noreferrer"
            >
              Vote now
            </a>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="335"
              height="539"
              viewBox="0 0 335 539"
              fill="none"
            >
              <path
                d="M0 37.5186V539H299L335 500.953V0H35.5L0 37.5186Z"
                fill="black"
              />
            </svg>

            <div className="w-[365px] z-10 h-[194.08px] left-[-15px] top-[270px] absolute">
              <Image
                className="left-0 top-0 absolute z-10"
                src={GovernanceKurwaCard}
                width={365}
                height={176}
                alt="gov-kurwa-card"
              />
              <div className="z-10 w-[309.34px] h-[188.66px] left-[31.52px] top-[5.42px] absolute opacity-30 mix-blend-overlay bg-[#fbff3a] rounded-full blur-[150px]" />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export const CommunityBlock = () => {
  return (
    <React.Fragment>
      <div className="hidden governance:block mx-auto w-[1286px] h-[780px] relative bg-[#11121a]">
        <div className="w-[746px] h-[344px] left-[540px] top-[359px] absolute bg-black">
          <Image
            className="w-[794px] h-[549px] left-[-48px] top-[-205px] absolute"
            src={GovernanceKurwaBg}
            alt="gov-kurwa-bg-card"
          />
          <div className="w-[411.33px] h-[84px] left-[167px] top-[221px] absolute">
            <div className="w-[131px] h-[42px] left-[269.67px] top-0 absolute bg-[#fcfc03]" />
            <div className="w-[318.50px] h-[42px] left-[92.83px] top-[42px] absolute bg-[#fcfc03]" />
            <div className="w-[408.33px] left-0 top-0 absolute text-center">
              <span className="text-white text-[35px] font-bold font-unbounded leading-[42px]">
                Focused on{' '}
              </span>
              <span className="text-black text-[35px] font-bold font-unbounded leading-[42px]">
                Trust
              </span>
              <span className="text-white text-[35px] font-bold font-unbounded leading-[42px]">
                {' '}
                and{' '}
              </span>
              <span className="text-black text-[35px] font-bold font-unbounded leading-[42px]">
                Collaboration
              </span>
            </div>
          </div>
        </div>
        <div className="h-[239px] top-[91px] absolute flex-col justify-start items-start gap-3.5 inline-flex">
          <div className="whitespace-pre-wrap self-stretch text-white text-6xl font-bold font-unbounded uppercase leading-[72px]">
            {'COMMUNITY-DRIVEN\nGOVERNANCE'}
          </div>
          <div className="w-[545px] opacity-70 text-white text-lg font-normal font-poppins leading-[27px]">
            At CYBRO, governance is a shared responsibility. Through open voting
            systems, every token holder contributes to the decisions that drive
            the platform’s growth and innovation.
          </div>
        </div>
        <div className="pl-10 pr-[33px] pt-[41px] pb-[37px] top-[359px] absolute bg-[#11121a] border border-[#353550] justify-end items-center gap-[43px] inline-flex">
          <div className="self-stretch flex-col justify-start items-start gap-3.5 inline-flex">
            <div className="opacity-90 text-white text-[49px] font-bold font-unbounded uppercase leading-[58.80px]">
              1600+
            </div>
            <div className="text-white/60 text-[15px] font-normal font-unbounded leading-[21px] tracking-tight">
              Active Holders
            </div>
          </div>
          <Image src={Avatars} alt="avatars" />
        </div>
        <div className="bg-raised w-[540px] h-[172px] top-[531px] absolute bg-[#21222f]">
          <div className="left-[40px] top-[41px] absolute flex-col justify-start items-start gap-3.5 inline-flex">
            <div className="opacity-90 text-white text-[49px] font-bold font-unbounded uppercase leading-[58.80px]">
              $7M
            </div>
            <div className="text-white/60 text-[15px] font-normal font-unbounded leading-[21px] tracking-tight">
              Raised in Early Stages
            </div>
          </div>
        </div>
      </div>

      <div className="governance:hidden flex mx-auto justify-center w-full max-w-[375px] h-[912px] relative bg-[#11121a]">
        <div className="h-48 top-[80px] absolute flex-col justify-start items-start gap-3 inline-flex">
          <div className="self-stretch text-center text-white text-[25px] font-bold font-unbounded uppercase leading-[30px]">
            COMMUNITY-DRIVEN GOVERNANCE
          </div>
          <div className="self-stretch h-[120px] flex-col justify-start items-center flex">
            <div className="max-w-[335px] opacity-70 text-center text-white text-base font-medium font-poppins leading-normal">
              At CYBRO, governance is a shared responsibility. Through open
              voting systems, every token holder contributes to the decisions
              that drive the platform’s growth and innovation.
            </div>
          </div>
        </div>
        <div className="w-full max-w-[335px] h-80 top-[567px] absolute flex-col justify-start items-start inline-flex">
          <div className="w-full h-40 relative">
            <div className="w-full h-40 left-0 top-0 absolute bg-[#11121a] border border-[#353550]" />
            <div className="h-[22px] left-[62.01px] top-[25px] absolute flex-col justify-center items-center gap-[5px] inline-flex">
              <div className="justify-start items-start gap-[7px] inline-flex">
                <div className="text-white text-lg font-bold font-unbounded uppercase leading-snug">
                  1600+
                </div>
                <div className="text-[#686875] text-[15px] font-normal font-unbounded capitalize leading-[21px]">
                  Active Holders
                </div>
              </div>
            </div>
            <Image
              src={Avatars}
              className="absolute left-0 right-0 mx-auto bottom-[33px] h-[60px]"
              alt="avatars"
            />
          </div>
          <div className="self-stretch h-40 px-5 pt-[25px] bg-[#21222f] flex-col justify-start items-center flex">
            <div className="justify-center items-start gap-[7px] inline-flex">
              <div className="text-white text-lg font-bold font-unbounded uppercase leading-snug">
                $7M
              </div>
              <div className="text-[#686875] text-[15px] font-normal font-unbounded capitalize leading-[21px]">
                Raised in Early Stages
              </div>
            </div>
            <Image src={GovernanceMoneyMobile} alt="governane-money-mob" />
          </div>
        </div>
        <div className="w-[335px] h-[216px] top-[351px] absolute bg-black">
          <Image
            className="w-[335px] h-[275px] left-0 top-[-59px] absolute"
            src={GovernaneKurwaSmallBg}
            alt="governane-small-bg"
          />
          <div className="h-[101px] left-[-37px] top-[115px] absolute bg-gradient-to-b from-[#11121a] to-[#11121a]" />
        </div>
        <div className="w-full h-[63px] left-[-17px] top-[489px] absolute">
          <div className="w-[94px] h-8 left-[250px] top-0 absolute bg-[#fcfc03]" />
          <div className="w-[226px] h-8 left-[125px] top-[31px] absolute bg-[#fcfc03]" />
          <div className="w-[408.33px] left-0 top-[2px] absolute text-center">
            <span className="text-white text-[25px] font-bold font-unbounded leading-[30px]">
              Focused on{' '}
            </span>
            <span className="text-black text-[25px] font-bold font-unbounded leading-[30px]">
              Trust
              <br />
            </span>
            <span className="text-white text-[25px] font-bold font-unbounded leading-[30px]">
              and{' '}
            </span>
            <span className="text-black text-[25px] font-bold font-unbounded leading-[30px]">
              Collaboration
            </span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
