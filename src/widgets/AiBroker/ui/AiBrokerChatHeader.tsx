'use client';

import React from 'react';

import { Button } from '@heroui/react';
import clsx from 'clsx';

import { useMatches } from '@/shared/lib';
import { Group, InfoButtonTooltip } from '@/shared/ui';
import { useAiBrokerContext } from '@/widgets/AiBroker';
import ArrowUpIcon from '@assets/icons/arrow-up.svg';
import RefreshIcon from '@assets/icons/refresh.svg';

export const AiBrokerChatHeader = () => {
  const { handleStartChat, isLoadingStart } = useAiBrokerContext();
  const scrollElement = document.getElementById('scroll-chat');

  const backToTopText = useMatches({ md: 'Back to top', base: null });
  const resetChatText = useMatches({ md: 'Reset chat', base: null });

  const [scrollTop, setScrollTop] = React.useState(0);
  const handleToTop = () => {
    if (scrollElement) {
      scrollElement.scroll({ top: 0 });
    }
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setScrollTop(scrollElement?.scrollTop ?? 0);
    };

    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrollElement]);

  return (
    <Group
      className={clsx(
        'grid grid-cols-3 sticky top-0 bg-[#252627] w-full py-3 md:py-5 px-6',
      )}
    >
      {scrollTop > 0 && (
        <Button
          variant="light"
          className="col-start-1 font-unbounded text-xs uppercase text-white/60 md:px-4 px-1 min-w-0 w-fit justify-self-start"
          endContent={<ArrowUpIcon />}
          onClick={handleToTop}
        >
          {backToTopText}
        </Button>
      )}

      <InfoButtonTooltip
        baseClassName="col-start-2 justify-self-center"
        content={
          <span className="max-w-[330px]">
            AI Broker is an AI-powered tool that helps you find suitable
            investment funds based on your preferences.
            <br />
            <br />
            It considers factors like APY and Trust Factor. The AI model is
            still learning, and new features are coming.
            <br />
            <br />
            Not financial advice. Please do your own research before investing.
          </span>
        }
      >
        About ai-broker
      </InfoButtonTooltip>
      <Button
        variant="light"
        className="col-start-3 font-unbounded text-xs uppercase text-white/60 md:px-4 px-1 min-w-0 w-fit justify-self-end"
        onClick={() => handleStartChat()}
        isDisabled={isLoadingStart}
        endContent={
          <RefreshIcon className={isLoadingStart && 'animate-spin'} />
        }
      >
        {resetChatText}
      </Button>
    </Group>
  );
};
