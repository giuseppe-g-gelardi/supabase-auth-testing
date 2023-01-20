import Image from 'next/image'
import { UserIcon } from '@heroicons/react/20/solid'

type AvatarProps = {
  avatar: string | null;
}

export default function Avatar({ avatar }: AvatarProps) {

  if (!avatar) return <UserIcon className='h-10 w-10 border rounded-full border-black' /> // 32/32px matched tailwind's h/w-8
  return (
    <Image
      src={avatar} alt="" width={40} height={40}
      className="h-10 w-10 rounded-full"
    />
  )
}

// *
// * // This component renders the user's avatar OR a default icon if the user is not logged in
// *
