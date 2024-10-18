'use client';

import React from 'react';

import { Skeleton } from '@nextui-org/react';

import { Link, Text, TextView } from '@/shared/ui';

import { ProfilePortfolioType } from './types';

export const ProfilePortfolioMobile = ({
  fields,
  isLoading,
}: ProfilePortfolioType) => {
  if (isLoading) {
    return (
      <Skeleton
        classNames={{
          base: 'w-[327px] h-[143px] self-center rounded-2xl dark:bg-background-tableRow',
        }}
      />
    );
  }

  return (
    <div className="w-[327px] h-[143px] self-center bg-[url('/portfolioBg.png')] bg-cover py-[9px] flex flex-col justify-between items-center">
      <Text>Your portfolio</Text>
      <div className="w-full bg-[#F0D025] px-[18px] py-3 flex flex-wrap flex-row justify-between gap-3">
        {fields.map((field) => (
          <div key={field.label} className="flex flex-col gap-[3px] text-left">
            <Text textView={TextView.C4} className="!text-text-black-body60">
              {field.label}
            </Text>
            <Text textView={TextView.BU2} className="!text-text-black-body100">
              {field.value}
            </Text>
          </div>
        ))}
      </div>
      <Link href="/dashboard">Go to Dashboard</Link>
    </div>
  );
};
