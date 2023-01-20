import PrivateSwitch from "@/components/PrivateSwitch";
import ThemeSwitch from "@/components/ThemeSwitch";


import { User, createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext } from 'next'
import type { Database } from '@/db_types';
import type { Profile } from '@/types/UserTypes';


type ProtectedProps = {
  // user: User,
  profile: Profile
}

export default function SettingsPage({
  // user, 
  profile
}: ProtectedProps) {
  return (
    <div className="flex flex-col ">
      <div className="flex gap-4">
        change theme
        <ThemeSwitch />
      </div>
      <div className="flex gap-4">
        <p className="flex">
          {profile.isPrivate ? (
            <p className='text-rose-400'>You{"'"}r Profile is Private</p>
          ) : (<p className='text-purple-500'>You{"'"}r Profile is Public</p>)}
        </p>
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
      // user: session.user,
      profile
    },
  }
}


// import { User, createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
// import { GetServerSidePropsContext } from 'next'
// import type { Database } from '@/db_types';
// import type { Profile } from '@/types/UserTypes';
// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   const supabase = createServerSupabaseClient<Database>(ctx)
//   const { data: { session } } = await supabase.auth.getSession()

//   const { data: profile } = await supabase
//     .from('profiles').select('*').eq('id', session?.user.id).single()

//   if (!session)
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     }

//   return {
//     props: {
//       initialSession: session,
//       user: session.user,
//       profile
//     },
//   }
// }
