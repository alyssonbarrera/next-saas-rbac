import { Role } from '@saas/auth'

import { api } from '../../api-client'

type UpdateMemberRequestParams = {
  role: Role
  memberId: string
  organizationSlug: string
}

type UpdateMemberRequestResponse = {
  member: {
    id: string
    role: Role
    userId: string
    organizationId: string
  }
}

export async function updateMemberRequest({
  role,
  memberId,
  organizationSlug,
}: UpdateMemberRequestParams): Promise<UpdateMemberRequestResponse> {
  const result = await api
    .put(`organizations/${organizationSlug}/members/${memberId}`, {
      json: { role },
    })
    .json<UpdateMemberRequestResponse>()

  return result
}
