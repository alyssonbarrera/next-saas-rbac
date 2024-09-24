import { Role } from '@saas/auth'

import { api } from '../../api-client'

type GetInvitesRequestResponse = {
  invites: {
    id: string
    email: string
    role: Role
    createdAt: Date
    author: {
      id: string
      name: string | null
      avatarUrl: string | null
    } | null
  }[]
}

export async function getInvitesRequest(
  organization: string,
): Promise<GetInvitesRequestResponse> {
  const result = await api
    .get(`organizations/${organization}/invites`, {
      next: {
        tags: [`${organization}/invites`],
      },
    })
    .json<GetInvitesRequestResponse>()

  return result
}
