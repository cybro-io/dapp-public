import React from 'react';

import Link from 'next/link';

export const ExclusiveOffer = () => {
  return (
    <div className="user-menu__offer">
      <span className="user-menu__offer-title">Grow your CYBRO Capital</span>
      <p className="user-menu__offer-desc">
        Stake your CYBRO tokens and earn up to 20% more!
      </p>
      <Link
        href="/staking"
        className={'button button--yellow button--arrow user-menu__offer-btn'}
        rel="noreferrer"
      >
        Stake CYBRO
      </Link>
    </div>
  );
};
