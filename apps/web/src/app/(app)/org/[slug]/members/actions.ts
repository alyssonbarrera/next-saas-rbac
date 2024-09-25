'use server'

import { Role } from '@saas/auth'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'

import { getCurrentOrg } from '@/auth'
import { createInviteRequest } from '@/http/requests/invites/create-invite-request'
import { revokeInviteRequest } from '@/http/requests/invites/revoke-invite-request'
import { removeMemberRequest } from '@/http/requests/members/remove-member-request'
import { updateMemberRequest } from '@/http/requests/members/update-member-request'
import { createInviteSchema } from '@/validations/schemas/create-invite-schema'

export async function removeMemberAction(memberId: string) {
  const currentOrganization = getCurrentOrg()

  await removeMemberRequest({
    memberId,
    organizationSlug: currentOrganization!,
  })

  revalidateTag(`${currentOrganization}/members`)
}

export async function updateMemberAction(memberId: string, role: Role) {
  const currentOrganization = getCurrentOrg()

  await updateMemberRequest({
    role,
    memberId,
    organizationSlug: currentOrganization!,
  })

  revalidateTag(`${currentOrganization}/members`)
}

export async function revokeInviteAction(inviteId: string) {
  const currentOrganization = getCurrentOrg()

  await revokeInviteRequest({
    inviteId,
    organizationSlug: currentOrganization!,
  })

  revalidateTag(`${currentOrganization}/invites`)
}

export async function createInviteAction(data: FormData) {
  const currentOrganization = getCurrentOrg()

  const result = createInviteSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { email, role } = result.data

  try {
    await createInviteRequest({
      email,
      role,
      organizationSlug: currentOrganization!,
    })

    revalidateTag(`${currentOrganization}/invites`)
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()

      return {
        success: false,
        message,
        errors: null,
      }
    }

    console.error(error)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Successfully created the invite.',
    errors: null,
  }
}
