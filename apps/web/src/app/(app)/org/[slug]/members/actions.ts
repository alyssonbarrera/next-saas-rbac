'use server'

import { revalidateTag } from 'next/cache'

import { getCurrentOrg } from '@/auth'
import { removeMemberRequest } from '@/http/requests/members/remove-member-request'

export async function removeMemberAction(memberId: string) {
  const currentOrganization = getCurrentOrg()

  await removeMemberRequest({
    memberId,
    organizationSlug: currentOrganization!,
  })

  revalidateTag(`${currentOrganization}/members`)
}
