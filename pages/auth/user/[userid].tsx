import { useEffect } from "react"
import Link from "next/link"

import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useInView } from 'react-intersection-observer';
import { dehydrate, QueryClient, useInfiniteQuery } from '@tanstack/react-query'

import Avatar from "@/components/Avatar"

import { getInfinitePosts, getInitialPosts } from "@/api/posts"

import type { GetServerSideProps } from "next"
import type { DehydratedState } from "@tanstack/react-query"
import type { Database, Profile, Post } from '@/types'
// import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient(
  //   {
  //   defaultOptions: {
  //     queries: {
  //       refetchOnMount: true,
  //       keepPreviousData: false,
  //       // refetchOnReconnect: true,
  //       // retry: 1,
  //       // retryDelay: 1000,
  //       // retryOnMount: false,
  //       // refetchInterval: false,
  //     }
  //   }
  // }
  )
  const supabase = createServerSupabaseClient<Database>(ctx)
  const userid = ctx.query.userid as string

  // queryClient.invalidateQueries(['getPosts', 'getInfinitePosts'])

  const {
    data: profile, error: profileError
  } = await supabase.from('profiles').select('*').eq('id', userid).single()

  await queryClient.prefetchQuery({
    queryKey: ['getPosts'],
    queryFn: async () => getInitialPosts(userid),

  })


  if (profileError) console.error(profileError)
  // if (postError) console.error(postError)

  return {
    props: {
      profile,
      userid,
      dehydratedState: dehydrate(queryClient)
      // posts
    }
  }
}

type UserPageProps = {
  profile: Profile;
  dehydratedState: DehydratedState;
  userid: string;
  // posts: Array<Post>
}

export default function UserPage({ profile, userid }: UserPageProps) {
  const { ref, inView } = useInView()
  // const queryClient = useQueryClient()
  // const router = useRouter()

  // queryClient.invalidateQueries(['getPosts', 'getInfinitePosts'])



  const {
    data, error, isFetching, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['getInfinitePosts'],
    queryFn: async ({ pageParam = 0 }) => await getInfinitePosts(pageParam, userid),
    getNextPageParam: (lastPage: any, allPages: any) => { // TODO: fix type // lastPage.count doesnt exist???
      const maxPages = lastPage.count / 10;
      const nextPage = allPages.length + 1;
      return nextPage <= maxPages ? nextPage : undefined;
    },
    refetchOnMount: true
  })

  useEffect(() => {
    let fetching = false;

    if (inView) {
      fetching = true;
      fetchNextPage()
    }

    return () => { fetching = false }
  }, [data, fetchNextPage, hasNextPage, inView])


  // useEffect(() => {
  //   // console.log({ error, isFetching, isLoading, isFetchingNextPage, hasNextPage })
  //   const exitingFunction = () => {
  //     console.log('exiting...');
  //   };
  //   router.events.on('routeChangeStart', exitingFunction);
  //   return () => {
  //     console.log('unmounting component...');
  //     router.events.off('routeChangeStart', exitingFunction);
  //   };
  // }, [error, hasNextPage, isFetching, isFetchingNextPage, isLoading, router.events]);


  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Something went wrong...</div>
  if (isFetching) return <div>Fetching...</div> // somehow this fixed all of my problems lmao

  return (
    <div className="flex flex-col gap-5 items-center justify-center bg-gradient-to-r from-indigo-500 h-full">
      <div className="flex flex-col">
        <div className="flex">
          <pre>{JSON.stringify(profile, null, 2)}</pre>
          <div className='ml-auto'><Avatar avatar={profile.avatar} /></div>
        </div>
        <div>
          <p>Posts: [</p>

          {data?.pages?.map(({ data, count }: any, i: number) =>
            <div key={i}>
              {data?.map((post: Post) =>
                <div key={post.id} className="flex">
                  <div>
                    <Link href={`/auth/post/${post.id}`}>
                      <pre className="ml-20">{JSON.stringify(post, null, 2)}</pre>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          <div>
            <button ref={ref} onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
              {isFetchingNextPage ? 'Loading more...'
                : hasNextPage ? 'Load Newer' : 'Nothing more to load'}
            </button>
          </div>

          <div className='animage-pulse'>
            {isFetching && !isFetchingNextPage
              ? 'Background Updating...'
              : null}
          </div>
        </div>
      </div>
    </div>
  )
}
