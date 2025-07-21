'use client';

import React from 'react';

import { ComponentWithProps } from '@/shared/types';

import { ModalIdToView, useModal } from './index';

type ModalContainerProps = {};

export const ModalContainer: ComponentWithProps<ModalContainerProps> = () => {
  const { currentModal } = useModal();

  if (typeof currentModal === 'undefined') {
    return null;
  }

  const Modal = ModalIdToView[currentModal];

  return <React.Fragment>{Modal}</React.Fragment>;
};
