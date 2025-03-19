import React from 'react';

import clsx from 'clsx';

import {
  ManageNotificationButton,
  ManageNotifications,
} from '@/features/ManageNotifications';
import styles from '@/shared/styles/Scrollbar.module.scss';
import {
  Badge,
  Group,
  Modal,
  NotificationButton,
  Stack,
  Typography,
} from '@/shared/ui';

import { useNotifications } from '../model/useNotifications';
import { useReadNotification } from '../model/useReadNotification';

import { NoItemsNotifications } from './NoItemsNotifications';
import { NotificationList } from './NotificationList';
import { NotificationsProps } from './types';

export const Notifications = ({ address }: NotificationsProps) => {
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  const [isOpenManage, setIsOpenManage] = React.useState(false);

  const isOpen = isOpenModal || isOpenManage;

  const {
    seenNotifications,
    newNotifications,
    hasNewNotifications,
    hasNotifications,
    hasSeenNotifications,
  } = useNotifications({ address });

  const { handleReadNotification } = useReadNotification();

  const onReadNotification = (notificationId: number) => {
    if (address) {
      handleReadNotification(address, notificationId);
    }
  };

  if (!hasNotifications && !isOpenManage) {
    return (
      <NoItemsNotifications onOpenChangeManage={() => setIsOpenManage(true)} />
    );
  }

  return (
    <React.Fragment>
      <NotificationButton
        onClick={() => setIsOpenModal((prev) => !prev)}
        withBing={hasNewNotifications}
      />
      {isOpen && (
        <Modal
          onClose={() => {
            setIsOpenModal(false);
            setIsOpenManage(false);
          }}
          hideCloseButton
          scrollBehavior="inside"
          classNames={{
            backdrop: 'z-[39]',
            wrapper: 'z-[39] justify-end overflow-hidden',
            base: 'self-start top-[81px] 2lg:top-[109px] 2lg:min-h-[calc(100%-109px)] min-h-[calc(100%-81px)] !rounded-b-none',
          }}
        >
          {isOpenManage ? (
            <ManageNotifications onClose={() => setIsOpenManage(false)} />
          ) : (
            <React.Fragment>
              <Modal.Header className="animate-fade-left md:px-4">
                <Group className="justify-between items-center w-full">
                  <Group className="gap-1">
                    <Typography order={2}>
                      {hasNewNotifications
                        ? 'New Notifications'
                        : 'All Notifications'}
                    </Typography>
                    <Badge>
                      {hasNewNotifications
                        ? `+${newNotifications.length}`
                        : seenNotifications.length}
                    </Badge>
                  </Group>

                  {/*<ManageNotificationButton*/}
                  {/*  onClick={() => setIsOpenManage(true)}*/}
                  {/*/>*/}
                </Group>
              </Modal.Header>
              <Modal.Body className="animate-fade-left md:px-4">
                <Stack
                  className={clsx(
                    'gap-6 flex-nowrap overflow-y-auto overflow-x-hidden pr-1',
                    styles.scrollbar,
                  )}
                >
                  <Stack className="gap-1.5">
                    <NotificationList
                      onReadNotification={onReadNotification}
                      notifications={
                        newNotifications.length
                          ? newNotifications
                          : seenNotifications
                      }
                    />
                  </Stack>

                  {hasNewNotifications && hasSeenNotifications && (
                    <Stack className="gap-1.5">
                      <Group className="gap-1">
                        <Typography
                          order={2}
                          weight="regular"
                          className="text-white/60"
                        >
                          Already Viewed
                        </Typography>
                        <Badge className="bg-white/60">
                          {seenNotifications.length}
                        </Badge>
                      </Group>

                      <NotificationList notifications={seenNotifications} />
                    </Stack>
                  )}
                </Stack>
              </Modal.Body>
            </React.Fragment>
          )}
        </Modal>
      )}
    </React.Fragment>
  );
};
