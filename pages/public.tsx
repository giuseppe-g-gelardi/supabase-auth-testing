
import Avatar from '@/components/Avatar'
import type { Database } from '@/db_types'
import { Profile } from '@/types/UserTypes'
import { User, createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext } from 'next'


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
            <pre>{JSON.stringify(profile, null, 2)}</pre>
            <div className='ml-auto'>
              <Avatar avatar={profile.avatar} />
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}
