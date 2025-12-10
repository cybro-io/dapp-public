import React from 'react';

import { Checkbox } from '@heroui/react';
import { useController } from 'react-hook-form';

import { Typography } from '@/shared/ui';

import { useExchangeContext } from '../model/ExchangeContext';

import { ExchangeButton } from './ExchangeButton';

export const ExchangeDetails = () => {
  const { form, isPending } = useExchangeContext();

  const { field } = useController({
    name: 'termsAndConditions',
    control: form.control,
  });

  const { value, ...fieldProps } = field;

  return (
    <div className="pt-4 pb-1 bg-background-tableRow rounded-2xl flex-col justify-start items-center gap-3 inline-flex overflow-hidden">
      <div className="w-full px-4 flex flex-col gap-3">
        <Checkbox
          {...fieldProps}
          isSelected={Boolean(value)}
          isDisabled={isPending}
          color="warning"
          classNames={{ wrapper: 'after:!bg-accent' }}
        >
          <Typography order={4} variant="caption" className="text-white/40">
            Before proceeding, please agree to our&nbsp;
            <a
              onClick={(event) => {
                event.stopPropagation();
              }}
              href="/Cybro Blast L2 Terms.pdf"
              target="_blank"
              download
              className="text-white relative z-10"
            >
              Terms and Conditions
            </a>
          </Typography>
        </Checkbox>
      </div>
      <div className="px-1 w-full">
        <ExchangeButton />
      </div>
    </div>
  );
};
