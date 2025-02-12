import React from 'react';

import { Text, TextView } from '@/shared/ui';

type ArticleCardProps = {
  title: string;
  description: string;
  href: string;
};

export const ArticleCard = ({ title, description, href }: ArticleCardProps) => {
  return (
    <a
      target="_blank"
      href={href}
      className="*:cursor-pointer min-w-0 md:min-w-[375px] flex flex-col gap-3 w-full p-2.5 hover:bg-background-chips rounded-[10px]"
      rel="noreferrer"
    >
      <Text textView={TextView.BU1}>{title}</Text>
      <Text textView={TextView.C4} className="!text-white/60">
        {description}
      </Text>
    </a>
  );
};
