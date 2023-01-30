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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient()
  const supabase = createServerSupabaseClient<Database>(ctx)

  const userid = ctx.query.userid

  const {
    data: profile, error: profileError
  } = await supabase.from('profiles').select('*').eq('id', userid).single()

  await queryClient.prefetchQuery({
    queryKey: ['getPosts'],
    queryFn: async () => getInitialPosts(profile?.id!)
  })


  if (profileError) console.error(profileError)
  // if (postError) console.error(postError)

  return {
    props: {
      profile,
      dehydratedState: dehydrate(queryClient)
      // posts
    }
  }
}

type UserPageProps = {
  profile: Profile
  dehydratedState: DehydratedState
  // posts: Array<Post>
}

export default function UserPage({ profile }: UserPageProps) {
  const { ref, inView } = useInView()

  const {
    data, error, isFetching, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['getInfinitePosts'],
    queryFn: async ({ pageParam = 0 }) => await getInfinitePosts(pageParam, profile.id),
    getNextPageParam: (lastPage: any, allPages: any) => { // TODO: fix type // lastPage.count doesnt exist???
      const maxPages = lastPage.count / 10;
      const nextPage = allPages.length + 1;
      return nextPage <= maxPages ? nextPage : undefined;
    },
  })

  useEffect(() => {
    let fetching = false;

    if (inView) {
      fetching = true;
      fetchNextPage()
    }

    return () => { fetching = false }
  }, [data, fetchNextPage, hasNextPage, inView])


  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Something went wrong...</div>

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
