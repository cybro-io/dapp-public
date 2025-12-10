import React from 'react';

import { Skeleton } from '@heroui/react';
import Link from 'next/link';

import { useFeaturedVaults, Vault } from '@/entities/Vault';
import { Button, Group, Stack, Title, Typography } from '@/shared/ui';

export const HubFeaturedVaults = () => {
  const { vaults, isLoading, vaultSkeletons } = useFeaturedVaults();

  return (
    <Stack className="gap-6 md:gap-8 items-center px-6">
      <Stack className="gap-3 md:gap-4 items-center">
        <Title
          order={{ md: 2, base: 3 }}
          uppercase
          className="max-w-[535px] text-center"
        >
          <text className="text-text-accent-yellow">Featured</text>
          &nbsp; Vaults
        </Title>
        <Typography
          order={2}
          variant="poppins"
          weight="regular"
          className="text-white/60 max-w-[618px] text-center"
        >
          Explore our top-performing vaults. With AI-powered management and
          optimized yields, these hand-picked selections are designed to suit
          different risk profiles and investment goals.
        </Typography>
      </Stack>

      <Group className="gap-5 justify-center">
        {!isLoading &&
          vaults?.map((vault) => (
            <Vault
              key={vault.vault_id}
              vault={vault.vault}
              linkClassName="w-full md:w-[327px] min-h-[426px]"
            />
          ))}

        {isLoading &&
          vaultSkeletons.map((_, index) => (
            <Skeleton
              key={index}
              classNames={{
                base: 'w-[327px] h-[426px] rounded-[20px] dark:bg-background-tableRow',
              }}
            />
          ))}
      </Group>

      <Link href="/one-click">
        <Button className="min-w-full md:min-w-[285px]">Discover more</Button>
      </Link>
    </Stack>
  );
};
