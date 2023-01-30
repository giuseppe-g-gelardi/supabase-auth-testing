import type { GetServerSideProps } from "next"
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import Avatar from "@/components/Avatar"

import { Database, Profile, Post } from '@/types'
import Link from "next/link"

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient<Database>(ctx)
  const userid = ctx.query.userid

  const {
    data: profile, error: profileError
  } = await supabase.from('profiles').select('*').eq('id', userid).single()
  const {
    data: posts, error: postError
  } = await supabase.from('posts').select('*').eq('posted_by', userid).order('created_at', { ascending: false })

  if (profileError) console.error(profileError)
  if (postError) console.error(postError)

  return { props: { profile, posts } }
}

type UserPageProps = {
  profile: Profile
  posts: Array<Post>
}

export default function UserPage({ profile, posts }: UserPageProps) {

  return (
    <div className="flex flex-col gap-5 items-center justify-center bg-gradient-to-r from-indigo-500 h-screen">
      <div className="flex flex-col">
        <div className="flex">
          <pre>{JSON.stringify(profile, null, 2)}</pre>
          <div className='ml-auto'><Avatar avatar={profile.avatar} /></div>
        </div>
        <div>
          <p>Posts: [</p>
          {posts.map(post => (
            <div key={post.id} className="flex">
              <div>
                <Link href={`/auth/post/${post.id}`}>
                  <pre className="ml-20">{JSON.stringify(post, null, 2)}</pre>
                </Link>
              </div>
            </div>
          ))}
          <p>]</p>
        </div>
      </div>
    </div>
  )
}
