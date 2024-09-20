import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getProfileRequest } from '@/http/requests/accounts/get-profile-request'

export async function auth() {
  const token = cookies().get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await getProfileRequest()

    return { user }
  } catch {}

  redirect('/api/auth/sign-out')
}
