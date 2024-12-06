import React from 'react';

import { Tooltip } from '@nextui-org/react';
import clsx from 'clsx';
import Image from 'next/image';

import { TooltipInfo } from '@/entities/VaultChips/ui/components';
import { BadgeVaultsResponseData, ComponentWithProps } from '@/shared/types';
import { Chip } from '@/shared/ui';

import CircleIcon from '../assets/icons/base-icon.svg';
import InfoIcon from '../assets/icons/info.svg';

import styles from './VaultChips.module.scss';

type VaultChipsProps = {
  badges: BadgeVaultsResponseData[];
};

export const VaultChips: ComponentWithProps<VaultChipsProps> = ({
  badges,
  className,
}) => {
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const chipsLength = badges.length;
  const notVisibleChipsLength = chipsLength - 3;
  const isInfoIconVisible = notVisibleChipsLength <= 0;

  const onTooltipClick = (event: any) => {
    event?.preventDefault();
    event?.stopPropagation();

    setIsTooltipOpen((prevState) => !prevState);
  };

  return (
    <div className={clsx(styles.root, className)}>
      {!!chipsLength && (
        <React.Fragment>
          {badges.slice(0, 3).map((badge) => (
            <Chip className={styles.chip} key={badge.name}>
              {badge.icon ? (
                <Image src={badge.icon} height={20} width={20} alt={''} />
              ) : (
                <CircleIcon />
              )}
              {badge.value}
            </Chip>
          ))}
          <Tooltip
            isOpen={isTooltipOpen}
            content={<TooltipInfo chips={badges} />}
            classNames={{ content: styles.tooltipContainer }}
          >
            <button onClick={onTooltipClick}>
              <Chip
                className={clsx(
                  styles.chip,
                  styles.tooltipChip,
                  isInfoIconVisible && styles.infoChip,
                  isTooltipOpen && styles.open,
                )}
              >
                {isInfoIconVisible ? <InfoIcon /> : `+${notVisibleChipsLength}`}
              </Chip>
            </button>
          </Tooltip>
        </React.Fragment>
      )}
    </div>
  );
};
