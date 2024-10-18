'use client';

import React from 'react';

import { Skeleton } from '@nextui-org/react';
import clsx from 'clsx';

import { QueryKey } from '@/shared/const';
import { useToast } from '@/shared/hooks';
import { useWeb3ModalAccount } from '@/shared/lib';
import {
  ComponentWithProps,
  useGetProfileRefcodeApiV1ProfileAddressRefcodeGet,
} from '@/shared/types';
import { IconButton, Text, TextView, ToastType } from '@/shared/ui';

import CopyIcon from '../assets/icon/copy.svg';

import styles from './ReferralLink.module.scss';

type ReferralLinkProps = {};

export const ReferralLink: ComponentWithProps<ReferralLinkProps> = ({
  className,
}) => {
  const { address } = useWeb3ModalAccount();
  const { triggerToast } = useToast();
  const { data, isLoading } = useGetProfileRefcodeApiV1ProfileAddressRefcodeGet(
    address || '',
    {
      query: { queryKey: [QueryKey.RefCode, address] },
    },
  );

  const presaleUrl = process.env.NEXT_PUBLIC_PRESALE_URL;
  const shortenUrl = presaleUrl?.replace(/^https?:\/\//, '');
  const refCode = data?.data?.data;

  const fullLink = React.useMemo(
    () => `${presaleUrl}/?ref=${refCode}`,
    [presaleUrl, refCode],
  );
  const shortLink = React.useMemo(
    () => `${shortenUrl}/?ref=${refCode}`,
    [refCode, shortenUrl],
  );

  const onCopyClick = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(fullLink);
      triggerToast({
        message: 'Success',
        description: 'Link was successfully copied',
      });
    } catch (e) {
      triggerToast({
        message: 'Error',
        description: 'Error copying link',
        type: ToastType.Error,
      });
    }
  }, [fullLink, triggerToast]);

  if (isLoading) {
    return (
      <Skeleton className="rounded-lg">
        <div className="h-14 w-52 rounded-full"></div>
      </Skeleton>
    );
  }

  return (
    <React.Fragment>
      {!!refCode && (
        <div className={clsx(styles.root, className)}>
          <Text className={styles.link} textView={TextView.P2}>
            {shortLink}
          </Text>
          <IconButton
            className={styles.button}
            icon={<CopyIcon />}
            onClick={onCopyClick}
          />
        </div>
      )}
    </React.Fragment>
  );
};
