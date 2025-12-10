'use client';

import React from 'react';

import { Maybe } from '@/shared/types';

import { ModalId } from '../index';

interface ModalContextType {
  currentModal: Maybe<ModalId>;
  openModal: (id: ModalId, props?: Record<string, any>) => void;
  closeModal: () => void;
  props: Record<string, any>;
}

const ModalContext = React.createContext<ModalContextType | undefined>(
  undefined,
);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentModal, setCurrentModal] =
    React.useState<Maybe<ModalId>>(undefined);
  const [props, setProps] = React.useState<Record<string, any>>({});

  const openModal = (id: ModalId, props?: Record<string, any>) => {
    setCurrentModal(id);

    props && setProps(props);
  };

  const closeModal = () => {
    setCurrentModal(undefined);
    setProps({});
  };

  React.useEffect(() => {
    if (typeof currentModal !== 'undefined') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [currentModal]);

  const contextValues = React.useMemo(
    () => ({ currentModal, openModal, closeModal, props }),
    [currentModal, props],
  );

  return (
    <ModalContext.Provider value={contextValues}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
