

import type { GetServerSideProps } from "next"
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import Avatar from "@/components/Avatar"

import { Database, Profile, Post } from '@/types'
import Link from "next/link"


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient<Database>(ctx)
  const postid = ctx.query.postid

  const {
    data: post, error: postError
  } = await supabase
    .from('posts')
    .select('*, posted_by: profiles("*")') // limit whats needed
    .eq('id', postid)

  if (postError) console.error(postError)

  return { props: { post } }
}

type PostPageProps = {
  post: Post
}

export default function PostPage({ post }: PostPageProps) {
  return (
    <div>
      <pre>{JSON.stringify(post, null, 2)}</pre>
    </div>
  )
}


