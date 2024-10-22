'use server'

import { Role } from '@saas/auth'
import { revalidateTag } from 'next/cache'

import { getCurrentOrg } from '@/auth'
import { createInviteRequest } from '@/http/requests/invites/create-invite-request'
import { revokeInviteRequest } from '@/http/requests/invites/revoke-invite-request'
import { removeMemberRequest } from '@/http/requests/members/remove-member-request'
import { updateMemberRequest } from '@/http/requests/members/update-member-request'
import { transferOwnershipRequest } from '@/http/requests/organizations/transfer-ownership-request'
import { executeServerActionWithHandling } from '@/utils/execute-server-action-with-handling'
import { createInviteSchema } from '@/validations/schemas/create-invite-schema'

export async function removeMemberAction(memberId: string) {
  const currentOrganization = await getCurrentOrg()

  await removeMemberRequest({
    memberId,
    organizationSlug: currentOrganization!,
  })

  revalidateTag(`${currentOrganization}/members`)
}

export async function updateMemberAction(memberId: string, role: Role) {
  const currentOrganization = await getCurrentOrg()

  await updateMemberRequest({
    role,
    memberId,
    organizationSlug: currentOrganization!,
  })

  revalidateTag(`${currentOrganization}/members`)
}

export async function revokeInviteAction(inviteId: string) {
  const currentOrganization = await getCurrentOrg()

  await revokeInviteRequest({
    inviteId,
    organizationSlug: currentOrganization!,
  })

  revalidateTag(`${currentOrganization}/invites`)
}

export async function createInviteAction(data: FormData) {
  const currentOrganization = await getCurrentOrg()

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

  async function executeCreateInvite() {
    await createInviteRequest({
      email,
      role,
      organizationSlug: currentOrganization!,
    })

    revalidateTag(`${currentOrganization}/invites`)
  }

  return await executeServerActionWithHandling({
    action: executeCreateInvite,
    successMessage: 'Successfully created the invite.',
  })
}

export async function transferOwnershipAction(transferToUserId: string) {
  const currentOrganization = await getCurrentOrg()

  async function executeTransferOwnership() {
    await transferOwnershipRequest({
      organizationSlug: currentOrganization!,
      transferToUserId,
    })

    revalidateTag(`${currentOrganization}/members`)
  }

  return await executeServerActionWithHandling({
    action: executeTransferOwnership,
    successMessage: 'Successfully transferred the ownership.',
  })
}
