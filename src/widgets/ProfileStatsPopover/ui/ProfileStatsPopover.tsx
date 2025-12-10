'use client';

import React from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
} from '@heroui/react';
import Image from 'next/image';

import './toggle.scss';
import { ProfileStatsPanel } from '@/entities/Profile';
import LogoIcon from '@/shared/assets/icons/logo-mini.svg';
import ProfileImage from '@/shared/assets/icons/profile.png';
import { truncateMiddle } from '@/shared/lib';
import { formatMoney } from '@/shared/utils';

import { useUserToggle } from '../model/useUserToggle';

export const ProfileStatsPopover = () => {
  const {
    address,
    cybroBalance,
    lcybroBalance,
    balances,
    userProfile,
    isLoading,
  } = useUserToggle();

  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <button className="user-toggle">
          <div className={'user-toggle__profile'}>
            <Image
              src={ProfileImage}
              alt="profile"
              className={'user-toggle__profile-icon'}
            />
          </div>
          <div className={'user-toggle__content'}>
            <div className="user-toggle__inner">
              {address ? (
                <span className="user-toggle__name">
                  {truncateMiddle(address, 3)}
                </span>
              ) : (
                <Skeleton
                  classNames={{
                    base: 'w-11 h-[14px] rounded-lg dark:bg-background-tableRow',
                  }}
                />
              )}
            </div>
            <div className="user-toggle__inner landscape">
              <span className="user-toggle__money">
                {isLoading ? (
                  <Skeleton
                    classNames={{
                      base: 'w-6 h-[14px] rounded-lg dark:bg-background-tableRow',
                    }}
                  />
                ) : (
                  formatMoney(cybroBalance)
                )}
              </span>
              <LogoIcon className="user-toggle__currency" />
            </div>
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="p-0 bg-transparent shadow-none">
        <ProfileStatsPanel
          isLoading={isLoading}
          points={userProfile?.points ?? 0}
          cybroBalance={cybroBalance}
          lcybroBalance={lcybroBalance}
          balances={balances}
        />
      </PopoverContent>
    </Popover>
  );
};
