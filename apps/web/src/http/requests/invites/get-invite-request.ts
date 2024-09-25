import { Role } from '@saas/auth'

import { api } from '../../api-client'

type GetInviteRequestParams = {
  inviteId: string
}

type GetInviteRequestResponse = {
  invite: {
    id: string
    email: string
    role: Role
    createdAt: string
    author: {
      id: string
      name: string | null
      avatarUrl: string | null
    } | null
    organization: {
      id: string
      name: string
      avatarUrl: string | null
    }
  }
}

export async function getInviteRequest({
  inviteId,
}: GetInviteRequestParams): Promise<GetInviteRequestResponse> {
  const result = await api
    .get(`invites/${inviteId}`)
    .json<GetInviteRequestResponse>()

  return result
}
