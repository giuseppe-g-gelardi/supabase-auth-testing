import type { GetServerSideProps } from "next"
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import Avatar from "@/components/Avatar"

import { Database, Profile, Post } from '@/types'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient<Database>(ctx)
  const userid = ctx.query.userid

  const {
    data: profile, error: profileError
  } = await supabase.from('profiles').select('*').eq('id', userid).single()
  const {
    data: posts, error: postError
  } = await supabase.from('posts').select('*').eq('posted_by', userid)

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
          {posts.map(post => (
            <div key={post.id} className="flex">
              <div><p>Posts: [</p>
                <pre className="ml-20">{JSON.stringify(post, null, 2)}</pre>
                <p>]</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
