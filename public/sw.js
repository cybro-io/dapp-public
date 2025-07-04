self.addEventListener('push', function (event) {
  const data = event.data.json();

  const { title, body, ...restData } = data;

  event.waitUntil(
    self.registration.showNotification(title, {
      icon: '/favicons/android-chrome-192x192.png',
      body,
      data: restData,
    }),
  );
});

self.addEventListener(
  'notificationclick',
  (event) => {
    const notification = event.notification;

    notification.close();

    const fundId = notification.data.meta.fund_id;
    if (fundId) {
      event.currentTarget.clients.openWindow(`/explore/${fundId}`);
    }
  },
  false,
);
