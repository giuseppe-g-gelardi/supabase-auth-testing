import ThemeSwitch from "@/components/ThemeSwitch";

export default function settings() {
  return (
    <div>
      change theme
      <ThemeSwitch />
    </div>
  )
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
