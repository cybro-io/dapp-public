'use client';

import React, { useMemo } from 'react';

import { Skeleton } from '@heroui/react';
import { getChainById } from '@lifi/data-types';
import Image from 'next/image';

import './menu.scss';

import Link from 'next/link';

import { GetCybroBalanceResponse } from '@/entities/Staking/model/useCybroBalance';
import LogoIcon from '@/shared/assets/assets/cybro-14.svg';
import LCybroIcon from '@/shared/assets/assets/locked-cybro-14.svg';
import CopyIcon from '@/shared/assets/icons/copy.svg';
import EthIcon from '@/shared/assets/icons/eth.svg';
import ProfileImage from '@/shared/assets/icons/profile.png';
import TetherIcon from '@/shared/assets/icons/tether.svg';
import UsdbIcon from '@/shared/assets/icons/usdb.svg';
import { links, truncateMiddle, useAppKitDisconnect } from '@/shared/lib';
import {
  EarnedYieldResponseDataProperty,
  GetWalletResponseData,
  Maybe,
} from '@/shared/types';
import { Group, InfoButtonTooltip, Stack, Typography } from '@/shared/ui';
import { formatMoney, formatUserMoney } from '@/shared/utils';

type ProfileStatsPanelProps = {
  profileData?: GetWalletResponseData;
  earnedYield?: EarnedYieldResponseDataProperty;
  address: Maybe<string>;
  isLoading?: boolean;
  cybroBalance: number;
  lcybroBalance: number;
  balance: GetCybroBalanceResponse[] | undefined;
};

export const ProfileStatsPanel = ({
  profileData,
  earnedYield,
  address,
  isLoading,
  cybroBalance,
  lcybroBalance,
  balance,
}: ProfileStatsPanelProps) => {
  const { disconnect } = useAppKitDisconnect();

  const data = useMemo(
    () => ({
      list: [
        {
          label: 'CYBRO Tokens',
          value: formatMoney(cybroBalance),
          leftIcon: LogoIcon,
          isNativeYieldInfo: false,
          withTooltip: 'cybro',
        },
        {
          label: 'LCYBRO Tokens',
          value: formatMoney(lcybroBalance),
          leftIcon: LCybroIcon,
          isNativeYieldInfo: false,
          withTooltip: 'lcybro',
          hide: !lcybroBalance,
        },
        {
          label: 'CYBRO Points',
          value: `${profileData?.points ?? 0} pts`,
          isNativeYieldInfo: false,
        },
        {
          label: 'Total Earned',
          leftIcon: EthIcon,
          value: `${formatMoney(Number(earnedYield?.ETH?.total))}`,
          isNativeYieldInfo: true,
        },
        {
          label: 'Due Last Week',
          leftIcon: EthIcon,
          value: `${formatMoney(Number(earnedYield?.ETH?.last))}`,
          isNativeYieldInfo: true,
        },
        {
          label: null,
          leftIcon: UsdbIcon,
          value: `${formatMoney(Number(earnedYield?.USDB?.total))}`,
          isNativeYieldInfo: true,
        },
        {
          label: null,
          leftIcon: UsdbIcon,
          value: `${formatMoney(Number(earnedYield?.USDB?.last))}`,
          isNativeYieldInfo: true,
        },
      ],
      desc: 'You are a participant in the Pre-Alpha Yield Program and earn <b>additional income</b> from your Cybro Token Balance.',
    }),
    [
      cybroBalance,
      lcybroBalance,
      profileData?.points,
      earnedYield?.ETH?.total,
      earnedYield?.ETH?.last,
      earnedYield?.USDB?.total,
      earnedYield?.USDB?.last,
    ],
  );

  const regexp = /<b>(.*)<\/b>/;
  const separatedDesc = data.desc.split(regexp);

  const formattedDescription = {
    firstPart: separatedDesc[0],
    boldText: data?.desc?.match(regexp)?.[1] || '',
    secondPart: separatedDesc[1],
  };

  const userBalance = useMemo(() => {
    if (profileData?.balance_usd && Number(profileData.balance_usd)) {
      return Number(profileData.balance_usd);
    }

    return 0;
  }, [profileData?.balance_usd]);

  return (
    <div className="user-menu z-50 relative">
      <div className="user-menu__header">
        <div className="user-menu__header-block">
          <span className="user-menu__header-label">Your Cybro Profile</span>
          <button onClick={disconnect} className="user-menu__logout">
            Log out
          </button>
        </div>
        <div className="user-menu__copy">
          <Image
            src={ProfileImage}
            alt="profile"
            className={'user-menu__logo'}
          />
          {address ? (
            <React.Fragment>
              <span className="user-menu__copy-text">
                {truncateMiddle(address, 3)}
              </span>
              <div className="user-menu__copy-box">
                <button
                  className="user-menu__copy-btn"
                  onClick={() => {
                    navigator.clipboard.writeText(`${address}`);
                  }}
                >
                  <CopyIcon className="user-menu__copy-icon" />
                </button>
                <span className="user-menu__copy-label">Copied!</span>
              </div>
            </React.Fragment>
          ) : (
            <Skeleton
              classNames={{
                base: 'w-20 h-[22px] rounded-lg dark:bg-background-tableRow',
              }}
            />
          )}
        </div>
      </div>
      <div className="user-menu__content">
        <ul className="user-menu__list">
          {data.list
            .filter((item) => !item.hide)
            .map(
              (item, index) =>
                (!item.isNativeYieldInfo ||
                  (item.isNativeYieldInfo &&
                    profileData?.claimable_yield_enrolled)) && (
                  <div
                    key={'userMenuItem' + index}
                    className={`user-menu__item${item.label === null ? ' user-menu__item-compact' : ''}`}
                  >
                    {item.label !== null && (
                      <Group className="items-center gap-1">
                        <span className="user-menu__item-label">
                          {item.label}
                        </span>
                        {item.withTooltip && (
                          <InfoButtonTooltip
                            buttonClassName="bg-background-window"
                            content={
                              <Stack className="gap-1">
                                {balance?.map((balanceItem) => (
                                  <Typography variant="caption" order={4}>
                                    {getChainById(balanceItem.chainId).name}
                                    :&nbsp;
                                    {formatUserMoney(
                                      item.withTooltip === 'cybro'
                                        ? balanceItem.cybro
                                        : balanceItem.locked,
                                    )}
                                  </Typography>
                                ))}
                              </Stack>
                            }
                          />
                        )}
                      </Group>
                    )}
                    <div className="user-menu__item-content">
                      {item.leftIcon ? (
                        <item.leftIcon className="user-menu__item-currency-left" />
                      ) : null}
                      <span className="user-menu__item-value">
                        {isLoading ? (
                          <Skeleton
                            classNames={{
                              base: 'w-12 h-[22px] rounded-lg dark:bg-background-tableRow',
                            }}
                          />
                        ) : (
                          item.value
                        )}
                      </span>
                      {/*{item.additionValue ? (*/}
                      {/*  <span className="user-menu__item-addition">{item.additionValue}</span>*/}
                      {/*) : null}*/}
                    </div>
                  </div>
                ),
            )}
        </ul>
        {!!userBalance && profileData?.claimable_yield_enrolled && (
          <p className="user-menu__desc">
            <span>{formattedDescription.firstPart}</span>
            {formattedDescription.boldText ? (
              <b>{formattedDescription.boldText}</b>
            ) : null}
            {formattedDescription.secondPart ? (
              <span>&nbsp;{formattedDescription.secondPart}</span>
            ) : null}
          </p>
        )}
        <div className="user-menu__offer">
          <span className="user-menu__offer-title">
            Grow your CYBRO Capital
          </span>
          <p className="user-menu__offer-desc">
            Stake your CYBRO tokens and earn up to 20% more!
          </p>
          <Link
            href="/staking"
            className={
              'button button--yellow button--arrow user-menu__offer-btn'
            }
            rel="noreferrer"
          >
            Stake CYBRO
          </Link>
        </div>
      </div>
    </div>
  );
};
