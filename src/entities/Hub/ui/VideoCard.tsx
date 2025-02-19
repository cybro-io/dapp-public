import React from 'react';

import { Text, TextView } from '@/shared/ui';

interface VideoCardProps {
  title: string;
  subtitle: string;
  href: string;
}

export const VideoCard = ({ title, subtitle, href }: VideoCardProps) => {
  return (
    <div className="flex-1 flex flex-col gap-4 w-[327px] min-w-[327px] md:max-w-[388px] md:w-full">
      <a
        href={href}
        className={
          'group/video relative *:cursor-pointer w-full h-[215px] md:h-[275px] rounded-[20px] p-4 bg-background-chips'
        }
      >
        <div className="w-full h-full rounded-[12px] bg-cover bg-[url('/images/VideoBg.png')] group-hover/video:blur-[2px] group-hover/video:opacity-50"></div>
        <Text
          textView={TextView.C3}
          className="absolute inset-0 flex justify-center items-center !text-white/60 invisible group-hover/video:visible group-hover/video:animate-jump-in"
        >
          Watch on YouTube
        </Text>
      </a>
      <div className="flex flex-col gap-2 text-center md:text-left">
        <Text textView={TextView.BU1}>{title}</Text>
        <Text textView={TextView.C4} className="!text-white/60">
          {subtitle}
        </Text>
      </div>
    </div>
  );
};
