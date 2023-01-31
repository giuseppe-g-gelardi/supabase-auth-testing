import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

import PrivateSwitch from "@/components/PrivateSwitch";
import ThemeSwitch from "@/components/ThemeSwitch";

import type { GetServerSidePropsContext } from 'next'
import type { Database, Profile } from '@/types'


type ProtectedProps = {
  profile: Profile
}

export default function SettingsPage({ profile }: ProtectedProps) {
  return (
    <div className="flex flex-col p-8 gap-6">
      <div className="flex gap-4">
        change theme
        <ThemeSwitch profile={profile} />
      </div>
      <div className="flex gap-4">
        <div className="flex">
          {profile.isPrivate ? (
            <p className='text-rose-400'>You{"'"}r Profile is Private</p>
          ) : (
            <p className='text-purple-500'>You{"'"}r Profile is Public</p>
          )}
        </div>
        <PrivateSwitch profile={profile} />
      </div>
    </div>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const supabase = createServerSupabaseClient<Database>(ctx)
  const { data: { session } } = await supabase.auth.getSession()

  const {
    data: profile
  } = await supabase.from('profiles').select('*').eq('id', session?.user.id).single()

  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }

  return {
    props: {
      initialSession: session,
      profile
    },
  }
}

