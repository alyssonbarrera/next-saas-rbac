import { Role } from '@saas/auth'

import { api } from '../../api-client'

export type InviteWithAuthorAndOrganization = {
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

type GetPendingInvitesRequestResponse = {
  invites: InviteWithAuthorAndOrganization[]
}

export async function getPendingInvitesRequest(): Promise<GetPendingInvitesRequestResponse> {
  const result = await api
    .get(`pending-invites`)
    .json<GetPendingInvitesRequestResponse>()

  return result
}
