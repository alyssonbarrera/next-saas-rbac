import { defineAbilityFor } from '@saas/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getProfileRequest } from '@/http/requests/accounts/get-profile-request'
import { getMembershipRequest } from '@/http/requests/organizations/get-membership-request'

export async function auth() {
  const cookieStore = await cookies()

  const token = cookieStore.get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await getProfileRequest()

    return { user }
  } catch {}

  redirect('/api/auth/sign-out')
}

export async function isAuthenticated() {
  const cookieStore = await cookies()
  return !!cookieStore.get('token')?.value
}

export async function getCurrentOrg() {
  const cookieStore = await cookies()
  return cookieStore.get('org')?.value ?? null
}

export async function getCurrentMembership() {
  const organization = await getCurrentOrg()

  if (!organization) {
    return null
  }

  const { membership } = await getMembershipRequest(organization)

  return membership
}

export async function ability() {
  const membership = await getCurrentMembership()

  if (!membership) {
    return null
  }

  const ability = defineAbilityFor({
    id: membership.userId,
    role: membership.role,
  })

  return ability
}
