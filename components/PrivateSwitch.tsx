import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import { Switch } from "@headlessui/react";
import { Fragment } from "react";
import { SunIcon, MoonIcon } from '@heroicons/react/20/solid'
import { updatePrivacy, } from "@/api/user";
import type { Profile } from "@/types/UserTypes";
import type { Database } from "@/db_types"

type PrivateSwitchProps = {
  profile: Profile
}

export default function PrivateSwitch({ profile }: PrivateSwitchProps) {
  const supabaseClient = useSupabaseClient<Database>()
  const router = useRouter()

  const handleUpdate = () => {
    updatePrivacy(profile?.id!, profile.isPrivate, supabaseClient)
    setTimeout(() => router.reload(), 500)
  }

  return (
    <Switch checked={profile.isPrivate} onChange={handleUpdate} as={Fragment}>
      {({ checked }) => (
        <a className={`${checked ? 'bg-purple-500' : 'bg-gray-200'
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span className={`${checked ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}>
            {profile.isPrivate ? (
              <MoonIcon className="h-4 w-4 text-gray-800" />
            ) : ( // TODO: change the images lol
              <SunIcon className="h-4 w-4 text-gray-800" />
            )}
          </span>
        </a>
      )}
    </Switch>
  )
}


      // onChange={() => `${updatePrivacy(profile?.id!, profile.isPrivate, supabaseClient)} ${router.reload()}`}

  // async function updatePrivacy(
  //   id: string,
  //   // supabaseClient: SupabaseClient
  // ) {
  //   const { error } = await supabaseClient
  //     .from('profiles')
  //     .update({ isPrivate: !profile.isPrivate })
  //     .eq('id', profile?.id)

  //   if (error) return error
  // }
