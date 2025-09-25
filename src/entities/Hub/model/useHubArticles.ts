import { useGetPostsApiV1DashboardPostsGet } from '@/shared/types';

export const useHubArticles = () => {
  const { data: articles, isLoading } = useGetPostsApiV1DashboardPostsGet(
    { limit: 3, offset: 0 },
    { query: { select: (data) => data.data.data } },
  );

  const isNoArticles = !isLoading && !articles?.length;

  const articleSkeletons = Array.from({ length: 3 }).fill('');

  return { articles, isLoading, isNoArticles, articleSkeletons };
};
