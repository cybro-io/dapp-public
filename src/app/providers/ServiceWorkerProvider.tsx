'use client';

import { useEffect } from 'react';

export const ServiceWorkerProvider = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  }, []);

  return null;
};
