import { useEffect, useState } from 'react';

import { getErrorMessage, triggerToast, useAppKitAccount } from '@/shared/lib';
import {
  PushSubscriptionPayload,
  useGetVapidPublicKeyApiV1NotificationVapidPublicKeyGet,
  useSubscribePushApiV1NotificationSubscribeAddressPost,
  useUnsubscribePushApiV1NotificationUnsubscribeAddressPost,
} from '@/shared/types';
import { ToastType } from '@/shared/ui';

const INSTALL_PWA_MESSAGE = 'Add this app to your home screen to continue';

export const useSubscribeWebPush = () => {
  const { address } = useAppKitAccount();
  const { data: publicVapidKey, isLoading: isDisabledSubscribe } =
    useGetVapidPublicKeyApiV1NotificationVapidPublicKeyGet({
      query: {
        select: (data) => data.data.data as string,
      },
    });

  const { mutateAsync: subscribeAsync, isPending: isLoadingSubscribe } =
    useSubscribePushApiV1NotificationSubscribeAddressPost();

  const { mutateAsync: unsubscribeAsync, isPending: isLoadingUnsubscribe } =
    useUnsubscribePushApiV1NotificationUnsubscribeAddressPost();

  const [pushSubscription, setPushSubscription] =
    useState<PushSubscription | null>(null);

  useEffect(() => {
    getSubscription().then(setPushSubscription);
  }, []);

  const handleSubscribe = async () => {
    try {
      if (!address) {
        throw new Error('Address required');
      }

      if (!publicVapidKey) {
        throw new Error('VAPID Public key required');
      }

      if (!('serviceWorker' in navigator)) {
        throw new Error('Service worker not supported');
      }

      if (!('Notification' in window)) {
        throw new Error(INSTALL_PWA_MESSAGE);
      }

      const notificationPermission = await Notification.requestPermission();

      if (notificationPermission !== 'granted') {
        throw new Error('Permission denied!');
      }

      const registration = await navigator.serviceWorker.ready;

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicVapidKey,
      });

      const subscriptionJSON = subscription.toJSON();

      await subscribeAsync({
        address,
        data: subscriptionJSON as unknown as PushSubscriptionPayload,
      });

      setPushSubscription(subscription);
    } catch (error) {
      const description = getErrorMessage(error);

      triggerToast({
        message:
          description === INSTALL_PWA_MESSAGE ? 'Install mobile app' : 'Error',
        description,
        type: ToastType.Error,
      });
    }
  };

  const handleUnsubscribe = async () => {
    if (!address || !pushSubscription) {
      return;
    }

    const subscriptionJSON = pushSubscription.toJSON();

    pushSubscription.unsubscribe().then((result) => {
      if (result) {
        setPushSubscription(null);
        return unsubscribeAsync({
          address,
          data: subscriptionJSON as unknown as PushSubscriptionPayload,
        });
      }
    });
  };

  const getSubscription = async () => {
    const registration = await navigator.serviceWorker.ready;

    return await registration.pushManager.getSubscription();
  };

  return {
    handleSubscribe,
    handleUnsubscribe,
    isDisabledSubscribe,
    isLoadingSubscribe,
    isLoadingUnsubscribe,
    pushSubscription,
  };
};
