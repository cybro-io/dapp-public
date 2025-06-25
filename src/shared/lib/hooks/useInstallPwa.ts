'use client';

import { useEffect, useState } from 'react';

export type PromptResponse = {
  outcome: 'accepted' | 'dismissed';
  platform: string;
};

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<PromptResponse>;
  prompt(): Promise<PromptResponse>;
}

export type UseInstallPWAPromptReturn = {
  promptEvent: BeforeInstallPromptEvent | null;
  installPWA: () => Promise<void>;
};

export function useInstallPwa(): UseInstallPWAPromptReturn {
  const [prompt, setState] = useState<BeforeInstallPromptEvent | null>(null);

  const installPWA = async () => {
    if (prompt) {
      const button = document.createElement('button');
      button.hidden = true;

      button.addEventListener('click', async () => {
        console.log('Installing PWA...');
        const response = await prompt.prompt();
        if (response.outcome === 'accepted') {
          setState(null);
        }

        button.remove();
      });

      button.click();
      return;
    }
    return Promise.reject(
      new Error(
        'Tried installing before browser sent "beforeinstallprompt" event',
      ),
    );
  };

  useEffect(() => {
    const event = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setState(e);
    };

    window.addEventListener('beforeinstallprompt', event as never);

    return () => {
      window.removeEventListener('beforeinstallprompt', event as never);
    };
  }, []);

  return { promptEvent: prompt, installPWA };
}
