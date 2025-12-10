import React from 'react';

import { Skeleton } from '@heroui/react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Controller } from 'react-hook-form';

import { ArticleCard, useHubArticles } from '@/entities/Hub';
import {
  useAddWaitList,
  useAddWaitListForm,
  WaitListEvent,
} from '@/features/AddWaitList';
import { links } from '@/shared/lib';
import {
  Button,
  ButtonSize,
  ButtonView,
  Stack,
  Text,
  TextView,
  Title,
  Typography,
} from '@/shared/ui';

export const HubBlog = () => {
  const { articles, isLoading, isNoArticles, articleSkeletons } =
    useHubArticles();

  const { handleAddWaitList, isLoadingCaptcha, captchaKey, recaptchaRef } =
    useAddWaitList();

  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
  } = useAddWaitListForm(async ({ email }) =>
    handleAddWaitList({
      email,
      event: WaitListEvent.all,
    }),
  );

  const isDisabledSubmit = !isValid || isLoadingCaptcha || isSubmitting;

  return (
    <section
      id="blog"
      className="flex flex-wrap flex-col md:flex-row justify-between gap-y-8 gap-x-6 max-w-[1180px] md:px-[50px] px-0"
    >
      {/* Left block */}
      <Stack className="flex-1 relative gap-6 md:gap-8 max-w-[518px] md:px-0 px-6">
        <Stack className="gap-3 md:gap-4">
          <Title order={{ md: 2, base: 3 }} uppercase className="max-w-[443px]">
            Crypto Insights & Education
          </Title>
          <Typography
            order={2}
            variant="poppins"
            className="text-white/60 font-normal max-w-[457px]"
          >
            Stay informed with expert analysis, market trends, and the latest
            news to help you make smarter investment choices. Our resources
            cover everything from cryptocurrency basics to advanced
            investment&nbsp;
            <text className="text-white font-bold">
              strategies, ensuring you have the tools you need to navigate the
              crypto world confidently.
            </text>
          </Typography>
        </Stack>

        <Stack className="gap-4">
          <Title order={5} className="text-text-accent-yellow">
            No spam. Only updates and release announcements.
          </Title>
          <form onSubmit={handleSubmit}>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <div className="flex flex-row gap-1 items-centerm rounded-[12px] lg:rounded-[18px] bg-background-chips px-1 py-1">
                  <input
                    className="w-full flex-1 bg-background-chips lg:bg-transparent outline-none pl-3 rounded-[8px] lg:rounded-[12px]"
                    placeholder="Your email here"
                    type="email"
                    {...field}
                  />
                  <Button
                    disabled={isDisabledSubmit}
                    className="flex-[0.5] w-full lg:max-w-[167px]"
                    size={{ base: ButtonSize.Small, lg: ButtonSize.Medium }}
                    type="submit"
                  >
                    Join Now
                  </Button>
                </div>
              )}
            />
          </form>
        </Stack>
      </Stack>

      {/* Right block */}
      <div className="flex-1 flex flex-col gap-6 justify-between px-6 md:px-0">
        <div className="flex flex-col gap-3">
          {isNoArticles && <Text textView={TextView.C4}>No articles</Text>}

          {isLoading
            ? articleSkeletons.map((_, index) => (
                <Skeleton
                  key={index}
                  classNames={{
                    base: 'w-full h-[130px] dark:bg-background-tableRow rounded-[10px]',
                  }}
                />
              ))
            : articles?.map((article) => (
                <ArticleCard
                  key={article.name}
                  href={article.link}
                  title={article.name}
                  description={article.short_description}
                />
              ))}
        </div>

        {!isNoArticles && (
          <a
            target="_blank"
            className="w-fit"
            href={links.medium}
            rel="noreferrer"
          >
            <Button view={ButtonView.Secondary} className="w-full md:w-fit">
              Read more articles
            </Button>
          </a>
        )}
      </div>
      {captchaKey && (
        <ReCAPTCHA ref={recaptchaRef} size="invisible" sitekey={captchaKey} />
      )}
    </section>
  );
};
