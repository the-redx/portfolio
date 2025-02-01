'use client';
import { Link } from '@/types/link.type';
import React, { useCallback } from 'react';
import { CreateLinkInput } from '../CreateLinkInput';
import { LinksList } from '../LinksList';
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
  useMutation,
} from '@tanstack/react-query';
import { ToastContainer, toast } from 'react-toastify';
import { createLink, fetchLinks, removeLink } from './utils';
import type { GetLinksResponse } from './types';
import type { FormData } from '../CreateLinkInput/CreateLinkInput';

export interface LinksBodyProps {}

const queryClient = new QueryClient();

const LinksBody: React.FC<LinksBodyProps> = () => {
  const { data, isLoading, fetchNextPage } = useInfiniteQuery<GetLinksResponse>({
    queryKey: ['links'],
    queryFn: fetchLinks,
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => pages.reduce((acc, page) => acc + page.links.length, 0),
  });

  const createLinkMutation = useMutation<
    Link,
    Error,
    {
      name?: string;
      id?: string;
      url: string;
    }
  >({
    mutationFn: createLink,
    onSuccess: link => {
      navigator.clipboard.writeText(link.shortUrl).then(
        () => toast.success('Short URL successfully created and copied to clipboard'),
        () => toast.success('Short URL successfully created'),
      );

      queryClient.setQueryData<{ pages: GetLinksResponse[]; pageParams: number[] }>(
        ['links'],
        query =>
          query && {
            pages: [{ links: [link], hasMore: !!query.pages.length }, ...query.pages],
            pageParams: [1, ...query.pageParams.map(p => p + 1)],
          },
      );
    },
  });

  const removeLinkMutation = useMutation<Link, Error, { linkId: string }>({
    mutationFn: removeLink,
    onSuccess: () => {
      toast.success('Link successfully removed');

      queryClient.invalidateQueries({ queryKey: ['links'] });
    },
    onError: err => toast.error(err.message ?? 'Failed to remove link'),
  });

  const handleCreateLink = useCallback(
    (formData: FormData) => createLinkMutation.mutateAsync(formData),
    [createLinkMutation],
  );

  const handleClickRemove = useCallback(
    (link: Link) => removeLinkMutation.mutateAsync({ linkId: link.id }),
    [removeLinkMutation],
  );

  return (
    <>
      <div className="mb-10 w-96 h-11">
        <CreateLinkInput onCreateLink={handleCreateLink} />
      </div>

      <LinksList
        links={data?.pages.flatMap(page => page.links) ?? []}
        hasMore={data?.pages[data?.pages.length - 1].hasMore ?? false}
        isLoading={isLoading}
        onClickMore={fetchNextPage}
        onClickRemove={handleClickRemove}
      />
    </>
  );
};

const LinksBodyContainer: React.FC<LinksBodyProps> = props => {
  return (
    <QueryClientProvider client={queryClient}>
      <LinksBody {...props} />

      <ToastContainer hideProgressBar position="bottom-left" theme="colored" />
    </QueryClientProvider>
  );
};

export default LinksBodyContainer;
