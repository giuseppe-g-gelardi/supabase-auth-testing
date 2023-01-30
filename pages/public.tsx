
import Link from 'next/link'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import Avatar from '@/components/Avatar'

import type { GetServerSidePropsContext } from 'next'
import type { Database, Profile } from '@/types'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient<Database>(ctx)

  const {
    data: profiles, error
  } = await supabase.from('profiles').select('*').eq('isPrivate', false)
  if (error) console.error(error)

  return { props: { profiles } }
}

type PublicProfilesProps = {
  profiles: Profile[]
}

export default function PublicPage({ profiles }: PublicProfilesProps) {

  return (
    <div className='flex flex-col gap-5 items-center justify-center bg-gradient-to-r from-indigo-500 h-screen'>
      this is a public page!
      <div className='flex flex-col'>
        {profiles.map(profile => (
          <div key={profile.id} className='flex'>
            <Link href={`/auth/user/${profile.id}`}>
              <pre>{JSON.stringify(profile, null, 2)}</pre>
            </Link>
            <div className='ml-auto'>
              <Avatar avatar={profile.avatar} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
