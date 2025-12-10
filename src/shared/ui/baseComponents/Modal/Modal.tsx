'use client';

import React from 'react';

import {
  Modal as NextUIModal,
  ModalProps as NextUIModalProps,
  ModalBodyProps,
  ModalHeaderProps,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@heroui/modal';
import clsx from 'clsx';

import CloseIcon from '@/shared/assets/icons/close.svg';
import { IconButton, Text, TextView } from '@/shared/ui';

type ModalProps = Pick<
  NextUIModalProps,
  | 'children'
  | 'shouldBlockScroll'
  | 'hideCloseButton'
  | 'scrollBehavior'
  | 'onClose'
  | 'classNames'
  | 'isDismissable'
  | 'isOpen'
  | 'defaultOpen'
  | 'size'
>;

export const Modal = ({
  children,
  classNames,
  defaultOpen,
  ...restProps
}: ModalProps) => {
  return (
    <NextUIModal
      defaultOpen={defaultOpen !== undefined ? defaultOpen : true}
      closeButton={<IconButton icon={<CloseIcon />} />}
      classNames={{
        backdrop: clsx('bg-transparent z-[998]', classNames?.backdrop),
        wrapper: clsx(
          'backdrop-blur-[32px] bg-background-bgBlur z-[998]',
          classNames?.wrapper,
        ),
        base: clsx(
          classNames?.base,
          'rounded-b-none rounded-t-[30px] md:rounded-[30px] bg-background-modal',
        ),
        closeButton: clsx(classNames?.closeButton, 'p-0 right-6 top-6 z-[999]'),
        footer: clsx(classNames?.footer),
        header: clsx(classNames?.header, 'px-6 pt-6 pb-0 justify-center'),
        body: clsx(classNames?.body, 'p-0 px-6 pb-6'),
      }}
      {...restProps}
    >
      <ModalContent className="!m-0 gap-4">{children}</ModalContent>
    </NextUIModal>
  );
};

const Header = ({ children, ...restProps }: ModalHeaderProps) => {
  return (
    <ModalHeader {...restProps}>
      {['string', 'number'].includes(typeof children) ? (
        <Text
          textView={TextView.H4}
          className="flex-1 text-center !heading-[44px] max-w-[255px] whitespace-pre-wrap"
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </ModalHeader>
  );
};

const Body = ({ children, ...restProps }: ModalBodyProps) => (
  <ModalBody {...restProps}>{children}</ModalBody>
);

Modal.Header = Header;
Modal.Body = Body;
