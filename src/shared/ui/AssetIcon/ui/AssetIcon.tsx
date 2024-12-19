'use client';

import React from 'react';

import { Skeleton, Tooltip } from '@nextui-org/react';
import Image, { ImageProps } from 'next/image';

import { links } from '@/shared/lib';

type AssetImage = Required<
  Pick<ImageProps, 'src' | 'alt' | 'width' | 'height'>
>;

export interface AssetIconProps extends AssetImage {
  subImage?: AssetImage;
}

export const AssetIcon = ({ subImage, src, ...restProps }: AssetIconProps) => {
  const [isLoadedImage, setIsLoadedImage] = React.useState(false);
  const [isLoadedSubImage, setIsLoadedSubImage] = React.useState(!subImage);

  const isLoaded = isLoadedImage && isLoadedSubImage;

  const tooltipText = subImage?.alt
    ? `${restProps.alt} ${subImage.alt}`
    : restProps.alt;

  return (
    <Skeleton
      isLoaded={isLoaded}
      classNames={{
        base: 'rounded-full dark:bg-background-chips',
        content: 'rounded-full bg-background-chips',
      }}
    >
      <Tooltip content={tooltipText}>
        <div
          className="relative cursor-pointer"
          style={{ height: restProps.height, width: restProps.width }}
        >
          <Image
            {...restProps}
            src={src ? src : links.noImage}
            loading="lazy"
            onLoad={() => setIsLoadedImage(true)}
          />

          {subImage && (
            <Image
              {...subImage}
              src={subImage.src ? subImage.src : links.noImage}
              loading="lazy"
              onLoad={() => setIsLoadedSubImage(true)}
              className="rounded-full bg-white absolute right-0 bottom-0"
            />
          )}
        </div>
      </Tooltip>
    </Skeleton>
  );
};
