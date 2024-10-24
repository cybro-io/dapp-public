import React from 'react';

import { Skeleton } from '@nextui-org/react';
import clsx from 'clsx';
import Link from 'next/link';

import { useFeaturedVaults, Vault } from '@/entities/Vault';
import { Button, ButtonView } from '@/shared/ui';

export const HubVaults = () => {
  const { vaults, isLoading, vaultSkeletons } = useFeaturedVaults();

  return (
    <div
      className={clsx(
        'flex items-center flex-col gap-6 mt-auto md:mt-[-217px] px-6 md:px-0 z-10',
      )}
    >
      <div className="flex flex-row flex-wrap gap-5 justify-center">
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
      </div>

      <Link href="/vaults">
        <Button view={ButtonView.Secondary} className="w-full md:w-[367px]">
          Explore all vaults
        </Button>
      </Link>
    </div>
  );
};
