import React from 'react';

import Image from 'next/image';

import { useMediaQuery } from '@/shared/lib';
import HubOneClickImage from '@images/HubOneClick.png';
import HubOneClickMobileImage from '@images/HubOneClickMobile.png';

export const HubOneClick = () => {
  const isMediumScreen = useMediaQuery('md');

  const ImageSrc = isMediumScreen ? HubOneClickMobileImage : HubOneClickImage;

  return (
    <div className="relative flex flex-col mx-auto my-[42px] md:my-0 md:mt-[-25px] bg-[url('/images/HubOneClick-bg.png')] bg-contain justify-center items-center">
      <div className="max-w-screen-xl">
        <Image src={ImageSrc} alt="One click" />
      </div>
    </div>
  );
};
