'use server'

import { Role } from '@saas/auth'
import { revalidateTag } from 'next/cache'

import { getCurrentOrg } from '@/auth'
import { revokeInviteRequest } from '@/http/requests/invites/revoke-invite-request'
import { removeMemberRequest } from '@/http/requests/members/remove-member-request'
import { updateMemberRequest } from '@/http/requests/members/update-member-request'

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
