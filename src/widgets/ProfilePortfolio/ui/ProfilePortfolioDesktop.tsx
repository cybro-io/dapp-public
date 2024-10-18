'use client';

import React from 'react';

import { Skeleton } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

import { Button, ButtonSize, ButtonView, Text, TextView } from '@/shared/ui';

import { ProfilePortfolioType } from './types';

export const ProfilePortfolioDesktop = ({
  fields,
  isLoading,
}: ProfilePortfolioType) => {
  const router = useRouter();

  if (isLoading) {
    return (
      <Skeleton
        classNames={{
          base: 'w-full h-[60px] dark:bg-background-tableRow',
        }}
      />
    );
  }

  return (
    <div className="bg-[#F0D025] px-6 py-3 flex flex-wrap flex-row justify-between items-center gap-3">
      <div className="flex flex-row flex-wrap items-center gap-y-3 gap-x-[50px]">
        <Text textView={TextView.C1} className="!text-text-black-body100">
          Your portfolio:
        </Text>
        <div className="flex flex-col md:flex-row flex-wrap justify-between gap-x-[35px]">
          {fields.map((field) => (
            <div
              key={field.label}
              className="flex flex-row items-center gap-[7px]"
            >
              <Text textView={TextView.C4} className="!text-text-black-body60">
                {field.label}
              </Text>
              <Text
                textView={TextView.BU2}
                className="!text-text-black-body100"
              >
                {field.value}
              </Text>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 flex justify-center lg:justify-end">
        <Button
          size={ButtonSize.Small}
          view={ButtonView.Secondary}
          onClick={() => router.push('/dashboard')}
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};
