import React from 'react';

import { Skeleton } from '@heroui/react';
import clsx from 'clsx';

import { useOneClickVaults, Vault } from '@/entities/Vault';

export const OneClickVaults = () => {
  const { vaults, vaultSkeletons, isLoading } = useOneClickVaults();

  return (
    <div
      className={clsx(
        'flex items-center flex-col gap-6 px-6 mt-auto md:mt-[-217px] md:px-0 z-10',
      )}
    >
      <div className="flex flex-row flex-wrap gap-5 justify-center">
        {!isLoading &&
          vaults?.map((vault) => (
            <Vault
              key={vault.id}
              vault={vault}
              linkClassName={clsx(
                'w-full md:w-[327px] min-h-[426px] lg:order-none',
              )}
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
    </div>
  );
};
