import { Role } from '@saas/auth'

import { api } from '../../api-client'

type GetPendingInvitesRequestResponse = {
  invites: {
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
  }[]
}

export async function getPendingInvitesRequest(): Promise<GetPendingInvitesRequestResponse> {
  const result = await api
    .get(`pending-invites`)
    .json<GetPendingInvitesRequestResponse>()

  return result
}
