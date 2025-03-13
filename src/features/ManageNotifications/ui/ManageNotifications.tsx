import React from 'react';

import { Button } from '@nextui-org/button';
import { Divider } from '@nextui-org/react';
import clsx from 'clsx';

import { platformSettings } from '@/features/ManageNotifications/lib/constants';
import styles from '@/shared/styles/Scrollbar.module.scss';
import { Group, Modal, Stack, Title, Typography } from '@/shared/ui';
import ArrowLeftIcon from '@assets/icons/arrow-left.svg';

import { useManageNotificationSetting } from '../model/useManageNotificationSetting';
import { useNotificationSettings } from '../model/useNotificationSettings';

import { SettingCategory } from './SettingCategory';
import { SettingField } from './SettingField';
import { ManageNotificationsProps } from './types';

export const ManageNotifications = ({ onClose }: ManageNotificationsProps) => {
  const { categories } = useNotificationSettings();
  const { handleChangeSetting, isLoading } = useManageNotificationSetting();

  return (
    <React.Fragment>
      <Modal.Header className="animate-fade-left justify-start lg:px-4 px-6">
        <Button
          onClick={onClose}
          variant="light"
          className="px-0.5 data-[hover=true]:bg-transparent"
        >
          <ArrowLeftIcon /> Back to notifications
        </Button>
      </Modal.Header>
      <Modal.Body className="gap-0 animate-fade-left md:px-4 overflow-hidden">
        <Divider />
        <Stack
          className={clsx(
            styles.scrollbar,
            'pr-1 pt-7 gap-[22px] overflow-y-auto flex-nowrap',
          )}
        >
          <Stack className="gap-2 flex-nowrap">
            <Title order={5}>Select Notification Events</Title>
            <Typography order={3} variant="poppins" className="text-white/80">
              Choose which updates you want to receive as push notifications.
              All changes are saved automatically.
            </Typography>
          </Stack>

          <Stack className="gap-7 flex-nowrap">
            {Object.entries(categories).map(([category, groups]) => (
              <SettingCategory name={category} key={category}>
                {groups.map((group) => (
                  <SettingField
                    key={group.name}
                    name={group.name}
                    description={group.description}
                    isSelected={group.state}
                    isDisabled={isLoading}
                    onValueChange={(isSelected) =>
                      handleChangeSetting(group.id, isSelected)
                    }
                  />
                ))}
              </SettingCategory>
            ))}
          </Stack>

          <Divider className="my-3" />

          <Stack className="gap-2 flex-nowrap">
            <Title order={4}>Choose How to Receive Notifications</Title>
            <Typography order={2} variant="poppins" className="text-white/80">
              You can enable multiple channels for notifications.
            </Typography>
          </Stack>

          <Stack className="gap-3">
            {platformSettings.map(({ isComing, Icon, description, name }) => (
              <SettingField
                key={name}
                name={name}
                description={description}
                icon={<Icon />}
                isComing={isComing}
                isDisabled={!isComing}
                isSelected={!isComing}
              />
            ))}
          </Stack>
        </Stack>
      </Modal.Body>
    </React.Fragment>
  );
};
