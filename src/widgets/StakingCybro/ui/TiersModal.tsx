import React from 'react';

import NiceModal from '@ebay/nice-modal-react';

import { StakeTierList } from '@/entities/Staking';
import { links } from '@/shared/lib';
import {
  AcceptField,
  Button,
  Link,
  LinkView,
  Modal,
  Stack,
  Title,
  Typography,
} from '@/shared/ui';

import classNames from './StakingCybro.module.scss';

export const TiersModal = NiceModal.create(() => {
  const currentModal = NiceModal.useModal();
  return (
    <Modal
      defaultOpen={false}
      isOpen={currentModal.visible}
      onClose={currentModal.remove}
      classNames={{
        base: [classNames.tiersRoot, 'max-w-[827px] lg:!max-h-[697px]'],
      }}
      size="5xl"
      scrollBehavior="inside"
    >
      <Modal.Header />
      <Modal.Body>
        <Stack className="relative w-full lg:flex-row lg:px-7 px-0 py-9 lg:gap-[50px] gap-6 lg:items-start items-center">
          <Stack className="z-10 flex-1 max-w-[402px] gap-[30px] lg:gap-6">
            <Stack className="gap-8 lg:items-start items-center">
              <Stack className="gap-2.5 lg:gap-3 text-center lg:text-left">
                <Title order={3} uppercase>
                  <span className="text-text-accent-yellow">Stake & Save:</span>
                  &nbsp; LOWER YOUR FEES WITH TIERS
                </Title>
                <Typography
                  order={2}
                  variant="poppins"
                  className="text-white/80"
                >
                  The new tier system rewards users who stake CYBRO tokens by
                  reducing vault fees. The more you stake, the higher your tier
                  – and the lower your fees. Unlock up to 90% discount on vault
                  fees by staking CYBRO.
                </Typography>
              </Stack>

              <Stack className="gap-4">
                <AcceptField
                  title="Lower Fees"
                  desc="Reduce vault fees by up to 90%"
                />
                <AcceptField
                  title="Flexible Staking"
                  desc="Upgrade or adjust your tier anytime"
                />
                <AcceptField
                  title="More Savings, More Rewards"
                  desc="Higher tiers bring better perks"
                />
              </Stack>

              <Stack className="gap-5 max-w-[319px] w-full lg:items-start items-center">
                <Button onClick={currentModal.remove} className="w-full">
                  Stake now
                </Button>

                <Link
                  viewType={LinkView.Link}
                  href={links.docTiers}
                  target={'_blank'}
                >
                  Read Tier System Docs
                </Link>
              </Stack>
            </Stack>
          </Stack>

          <StakeTierList />
        </Stack>
      </Modal.Body>
    </Modal>
  );
});
