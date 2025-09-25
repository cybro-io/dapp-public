import React from 'react';

import NiceModal from '@ebay/nice-modal-react';
import { Skeleton } from '@heroui/react';

import { useRampWidget, UseRampProps } from '@/features/RampTokenForm';
import { Modal } from '@/shared/ui';

export const RampWidgetStepModal = NiceModal.create<UseRampProps>((props) => {
  const currentModal = NiceModal.useModal();

  const { rampLinkWidget, isLoading } = useRampWidget(props);
  const isLoadedRampLink = !isLoading && Boolean(rampLinkWidget);
  const [isLoadingFrame, setIsLoadingFrame] = React.useState(true);

  return (
    <Modal
      isDismissable={false}
      classNames={{ base: 'w-[375px]' }}
      onClose={() => {
        currentModal.reject({ reason: 'on_close_munzen' });
        currentModal.remove();
      }}
    >
      <Modal.Header>Buy With a Card</Modal.Header>
      <Modal.Body className="pt-6 px-0 gap-4 relative items-center">
        <Skeleton
          isLoaded={isLoadedRampLink && !isLoadingFrame}
          classNames={{ base: 'rounded-[28px]' }}
        >
          <iframe
            onLoad={() => {
              setIsLoadingFrame(false);
            }}
            id="inlineFrameWidget"
            width="375"
            height="609"
            allow="camera; microphone; geolocation"
            frameBorder="0"
            src={rampLinkWidget}
            className="rounded-[26px]"
          />
        </Skeleton>
      </Modal.Body>
    </Modal>
  );
});
