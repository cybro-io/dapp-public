import React from 'react';

import { Accordion, AccordionItem } from '@heroui/react';

import { Stack, Title, Typography } from '@/shared/ui';
import MinusIcon from '@assets/icons/minus.svg';
import PlusIcon from '@assets/icons/plus.svg';

import { faqItems } from '../lib/constants';

export const ReferralFAQ = () => {
  return (
    <Stack className="md:gap-10 gap-6 items-center w-full">
      <Title order={{ md: 2, base: 3 }} uppercase>
        FAQ
      </Title>
      <Stack className="md:flex-row flex-nowrap w-full items-center md:items-start justify-center">
        <Accordion
          className="max-w-[335px] md:max-w-full flex-1 px-0"
          defaultExpandedKeys={new Set([1])}
        >
          {faqItems.map((item) => (
            <AccordionItem
              className=""
              classNames={{
                base: [
                  'transition border border-solid border-[#232432]',
                  'data-[open=true]:border-text-accent-logoYellow data-[open=true]:bg-black',
                  'hover:border-text-accent-logoYellow',
                ],
                indicator: 'order-first',
                trigger:
                  'py-[18px] md:pt-[34px] md:pb-9 data-[open=true]:md:pb-4 px-[18px] md:pl-9 md:pr-[94px]',
                content:
                  'pb-[18px] md:pb-9 pt-0 px-[18px] md:pl-9 md:pr-[94px]',
              }}
              indicator={({ isOpen }) =>
                isOpen ? <MinusIcon className="rotate-90" /> : <PlusIcon />
              }
              key={item.key}
              aria-label={item.key}
              title={
                <Typography order={{ md: 2, base: 5 }} weight="bold">
                  {item.title}
                </Typography>
              }
            >
              <Typography
                variant="poppins"
                order={{ base: 3, md: 2 }}
                className="text-white/80"
                weight="regular"
              >
                {item.content}
              </Typography>
            </AccordionItem>
          ))}
        </Accordion>
      </Stack>
    </Stack>
  );
};
