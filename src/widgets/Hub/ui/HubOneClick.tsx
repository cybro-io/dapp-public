import React from 'react';

import { useMediaQuery } from '@/shared/lib';
import HubOneClickImage from '@images/HubOneClick.png';
import HubOneClickMobileImage from '@images/HubOneClickMobile.png';

export const HubOneClick = () => {
  const isMediumScreeb = useMediaQuery('md');

  const Image = isMediumScreeb ? HubOneClickMobileImage : HubOneClickImage;

  return (
    <div className="my-[42px] md:my-0 md:mt-[-25px]">
      <img {...Image} alt="One click" />
    </div>
  );
};
