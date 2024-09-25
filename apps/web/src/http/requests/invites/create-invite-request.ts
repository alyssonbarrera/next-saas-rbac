import { Role } from '@saas/auth'

import { api } from '../../api-client'

type CreateInviteRequestParams = {
  role: Role
  email: string
  organizationSlug: string
}

type CreateInviteRequestResponse = {
  invite: {
    id: string
    email: string
    role: Role
    authorId: string | null
    organizationId: string
    createdAt: string
  }
}

export async function createInviteRequest({
  role,
  email,
  organizationSlug,
}: CreateInviteRequestParams): Promise<CreateInviteRequestResponse> {
  const result = await api
    .post(`organizations/${organizationSlug}/invites`, {
      json: {
        role,
        email,
      },
    })
    .json<CreateInviteRequestResponse>()

  return result
}
