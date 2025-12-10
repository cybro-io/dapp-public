'use client';

import React from 'react';

import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Select, SelectItem } from '@heroui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppKitProvider } from '@reown/appkit/react';
import { providers } from 'ethers';
import { isAddress } from 'ethers/lib/utils';
import { Controller, useForm, useWatch } from 'react-hook-form';
import * as yup from 'yup';

import { ConnectWallet } from '@/features/ConnectWallet';
import { getErrorMessage, triggerToast } from '@/shared/lib';
import {
  useGetTemplatesApiV1NotificationTemplatesGet,
  usePublishNotificationApiV1NotificationPublishPost,
} from '@/shared/types';
import { Stack, Title, ToastType, Typography } from '@/shared/ui';

import { BaseLayout } from '../layouts';

const validationSchema = yup.object().shape({
  address: yup
    .string()
    .required()
    .test('validAddress', 'Invalid address', (value) => {
      if (!value) {
        return false;
      }

      const addresses = value.split(',');
      return addresses.every((address) => isAddress(address));
    }),
  templateId: yup
    .number()
    .nullable()
    .typeError('Invalid value')
    .required()
    .positive(),
  meta: yup.object().required(),
});

const Page = () => {
  const form = useForm({
    defaultValues: {
      address: '',
      templateId: undefined,
      meta: {},
    },
    resolver: yupResolver(validationSchema),
  });

  const [metaKey, setMetaKey] = React.useState<string>('');
  const meta = useWatch({ control: form.control, name: 'meta' });

  const isDisabledAddMeta = !metaKey || metaKey in meta;
  const handleAddMeta = () => {
    const { meta } = form.getValues();

    form.setValue('meta', { ...meta, [metaKey]: '' });
    setMetaKey('');
  };

  const { mutateAsync, isPending: isPendingPublish } =
    usePublishNotificationApiV1NotificationPublishPost();

  const { data: templates = [] } = useGetTemplatesApiV1NotificationTemplatesGet(
    {
      query: { select: (data) => data.data.data ?? [] },
    },
  );

  const { walletProvider } = useAppKitProvider('eip155');

  const onSubmit = form.handleSubmit(async ({ address, templateId, meta }) => {
    try {
      if (!walletProvider) {
        throw new Error('Wallet provider is missing');
      }

      const addresses = address.split(',');
      const payload = { addresses, template_id: String(templateId), meta };

      const message = JSON.stringify(payload);
      const signer = new providers.Web3Provider(walletProvider).getSigner();
      const signature = await signer.signMessage(message);

      const response = await mutateAsync({ data: { message, signature } });

      if (response.data.error) {
        triggerToast({
          message: 'Error',
          type: ToastType.Error,
          description: response.data.error,
        });
      } else {
        triggerToast({
          message: 'Success',
          type: ToastType.Success,
          description: 'Message successfully sent',
        });
      }
    } catch (error) {
      triggerToast({
        message: 'Error',
        type: ToastType.Error,
        description: getErrorMessage(error),
      });
    }
  });

  return (
    <BaseLayout withMainPadding={false}>
      <Form className="mt-10 w-1/2 min-w-[375px] mx-auto" onSubmit={onSubmit}>
        <Title order={3}>Send notification</Title>
        <Controller
          control={form.control}
          render={({ field }) => (
            <Input
              placeholder="Enter the address (separated by ,)"
              {...field}
            />
          )}
          name="address"
        />

        <Controller
          control={form.control}
          render={({ field }) => (
            <Select placeholder="Select template" {...field}>
              {templates.map((template) => (
                <SelectItem key={template.id} textValue={template.content}>
                  [{template.color}]: {template.content}
                </SelectItem>
              ))}
            </Select>
          )}
          name="templateId"
        />

        <Controller
          control={form.control}
          render={({ field }) => {
            const metaKeys = Object.keys(field.value);

            const handleInputChange = (key: string, value: string | number) => {
              field.onChange({ ...field.value, [key]: value });
            };

            const handleClear = (keyToRemove: string) => {
              const updatedObject = Object.fromEntries(
                Object.entries(field.value).filter(
                  ([key]) => key !== keyToRemove,
                ),
              );

              field.onChange(updatedObject);
            };

            return (
              <Stack className="gap-2 w-full">
                <Input
                  placeholder="Add meta key"
                  value={metaKey}
                  onValueChange={setMetaKey}
                  endContent={
                    <Button
                      type="button"
                      size="sm"
                      isDisabled={isDisabledAddMeta}
                      onPress={handleAddMeta}
                    >
                      Add meta
                    </Button>
                  }
                />

                {metaKeys.length > 0 && (
                  <Stack className="gap-1 w-full p-2 bg-background-tableRow rounded-lg">
                    <Typography>Meta keys</Typography>
                    {metaKeys.map((key) => (
                      <Input
                        startContent={
                          <Typography
                            variant="caption"
                            order={4}
                            className="text-white/50"
                          >
                            {key}
                          </Typography>
                        }
                        key={key}
                        onValueChange={(value) => handleInputChange(key, value)}
                        isClearable
                        onClear={() => handleClear(key)}
                      />
                    ))}
                  </Stack>
                )}
              </Stack>
            );
          }}
          name="meta"
        />

        <ConnectWallet
          whenConnectedComponent={
            <Button
              type="submit"
              isLoading={isPendingPublish}
              isDisabled={!form.formState.isValid || isPendingPublish}
            >
              Send
            </Button>
          }
        />
      </Form>
    </BaseLayout>
  );
};

export default Page;
