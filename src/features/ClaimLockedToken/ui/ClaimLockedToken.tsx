import React from 'react';

import { Input } from '@heroui/react';
import { ChainId } from '@lifi/sdk';
import clsx from 'clsx';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useInterval } from 'usehooks-ts';

import { useClaimedCybroBalance, useCybroBalance } from '@/entities/Staking';
import { StakingBalance } from '@/entities/Staking/ui/StakingBalance';
import { ConnectWallet } from '@/features/ConnectWallet';
import { AnalyticsEvent, track } from '@/shared/analytics';
import {
  isErrorUserRejected,
  links,
  triggerToast,
  useShouldSwitchNetwork,
  useAppKitAccount,
} from '@/shared/lib';
import {
  Button,
  Group,
  Link,
  LinkView,
  Stack,
  Title,
  ToastType,
  Typography,
} from '@/shared/ui';
import typographyClassNames from '@/shared/ui/baseComponents/Typography/Typography.module.scss';
import { formatUserMoney } from '@/shared/utils';
import CybroIcon from '@assets/assets/cybro.svg';
import LockedCybro20Icon from '@assets/assets/locked-cybro-20.svg';
import LockedCybroIcon from '@assets/assets/locked-cybro.svg';
import BgImage from '@assets/images/ClaimLockedTokenSmallBg.webp';

import { useClaimLockedToken } from '../model/useClaimLockedToken';

import classNames from './ClaimLockedToken.module.scss';

interface ClaimLockedTokenProps {
  lockedAddress?: string;
}

export const ClaimLockedToken = ({ lockedAddress }: ClaimLockedTokenProps) => {
  const { address } = useAppKitAccount();

  const { isNeedSwitchNetwork, switchNetwork } = useShouldSwitchNetwork(
    ChainId.BLS,
  );

  const { balance, isLoadingBalance } = useCybroBalance({
    address,
    lockedAddress,
    chainId: ChainId.BLS,
  });

  const { claim, isLoadingClaimedBalance } = useClaimedCybroBalance(
    address,
    lockedAddress,
  );

  const { claimLockedTokenMutation, isPending } = useClaimLockedToken();

  const handleClaim = () => {
    if (isNeedSwitchNetwork) {
      switchNetwork();
      return;
    }

    if (!lockedAddress) {
      return;
    }

    claimLockedTokenMutation(lockedAddress)
      .then(() => {
        track.event(AnalyticsEvent.ClaimSuccess, {
          claimAddress: lockedAddress,
        });

        triggerToast({
          message: 'Successfully claimed Locked CYBRO',
          description: 'Check your updated Balance.',
        });
      })
      .catch((error) => {
        console.error(error);

        track.event(
          isErrorUserRejected(error)
            ? AnalyticsEvent.ClaimReject
            : AnalyticsEvent.ClaimError,
          {
            claimAddress: lockedAddress,
            message: JSON.stringify(error),
          },
        );

        if (!isErrorUserRejected(error)) {
          triggerToast({
            message: `Something went wrong`,
            description:
              'We were unable to complete the current operation. Try again or connect feedback.',
            type: ToastType.Error,
          });
        }
      });
  };

  const [currentDate, setCurrentDate] = React.useState(dayjs);

  useInterval(() => setCurrentDate(dayjs()), 1000);

  const tgeDate = '2024-12-14T09:00:00.000Z';

  const isTge = currentDate.isAfter(tgeDate);
  const durationTge = dayjs(tgeDate).diff(currentDate);

  return (
    <React.Fragment>
      <Stack
        className={clsx(
          'w-full lg:w-[936px] h-full lg:h-[575px] items-center lg:items-start bg-transparent lg:bg-background-card rounded-[30px] px-6 lg:px-[52px] py-0 lg:py-[56px]',
          classNames.bg,
        )}
      >
        <Stack className="z-10 flex-1 max-w-[412px] gap-[30px] lg:gap-6">
          <Stack className="gap-2.5 lg:gap-3 text-center lg:text-left">
            <Title order={3} uppercase>
              <span className="text-text-accent-yellow">SWAP</span> YOUR LOCKED
              cybro TOKENS
            </Title>
            <Typography order={2} variant="poppins" className="text-white/80">
              Transform your Locked Cybro tokens into fully unlocked tokens and
              unlock their full potential.
            </Typography>
          </Stack>

          {address && (
            <Group className="justify-between gap-[22px]">
              <StakingBalance
                className="flex-grow"
                title="Locked CYBRO Balance"
                icon={<LockedCybroIcon />}
                balance={balance?.locked ?? 0}
                isLoading={isLoadingBalance}
              />
              <StakingBalance
                className="flex-grow"
                title="Claimed CYBRO"
                icon={<CybroIcon />}
                balance={claim.claimed}
                isLoading={isLoadingClaimedBalance}
              />
            </Group>
          )}

          <Group className="gap-[22px]">
            <Stack className="gap-1">
              <Typography
                order={4}
                variant="caption"
                weight="medium"
                className="text-white/60"
              >
                TGE Unlock
              </Typography>
              <Typography order={3} variant="poppins">
                20%
              </Typography>
            </Stack>

            <Stack className="gap-1">
              <Typography order={4} variant="caption" className="text-white/60">
                Cliff
              </Typography>
              <Typography order={3} variant="poppins">
                3 months
              </Typography>
            </Stack>

            <Stack className="gap-1">
              <Typography order={4} variant="caption" className="text-white/60">
                Linearly Vesting
              </Typography>
              <Typography order={3} variant="poppins">
                9 months
              </Typography>
            </Stack>
          </Group>

          <Stack className="flex-1 justify-end gap-4 max-w-[350px] w-full self-center lg:self-auto items-center lg:items-start">
            {!isTge ? (
              <React.Fragment>
                <Title order={2} className="w-full pl-[48px]">
                  {dayjs.duration(durationTge).format('DD:HH:mm:ss')}
                </Title>

                <Button className="w-full" disabled>
                  Wait for TGE
                </Button>
              </React.Fragment>
            ) : (
              <ConnectWallet
                className="w-full"
                whenConnectedComponent={
                  <React.Fragment>
                    <Input
                      classNames={{
                        inputWrapper:
                          'p-4 h-[76px] bg-background-modal lg:bg-background-window rounded-[20px]',
                        label: clsx(
                          typographyClassNames.textCaption,
                          typographyClassNames.textCaption4,
                          '!text-white/60 font-medium',
                        ),
                        input: clsx(
                          typographyClassNames.textUnbounded1,
                          typographyClassNames.textUnbounded,
                          'font-medium',
                        ),
                      }}
                      label="Amount to swap"
                      readOnly
                      placeholder="Amount to swap"
                      value={formatUserMoney(claim.claimable) ?? ''}
                      startContent={
                        <div className="grow-0">
                          <LockedCybro20Icon />
                        </div>
                      }
                    />

                    <Button
                      className="w-full"
                      isLoading={isPending}
                      disabled={isPending || claim.claimable <= 0}
                      onClick={handleClaim}
                    >
                      {isNeedSwitchNetwork
                        ? 'Switch network'
                        : 'SWAP locked cybro'}
                    </Button>
                  </React.Fragment>
                }
              />
            )}

            <Link
              viewType={LinkView.Link}
              href={links.docClaiming}
              target={'_blank'}
            >
              locked cybro FAQ
            </Link>
          </Stack>
        </Stack>
      </Stack>

      <Image src={BgImage} alt="bg" className="block lg:hidden" />
    </React.Fragment>
  );
};
