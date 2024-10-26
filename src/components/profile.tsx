'use client'

import { useSession } from "next-auth/react"

export default function Profile() {
  const session = useSession();
  if(session.data?.user){
    return <div className="">User signed in (client) </div>
  }

  return  <div className="">User NOT signed in (client) </div>
}
