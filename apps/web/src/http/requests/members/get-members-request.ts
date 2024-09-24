import { Role } from '@saas/auth'

import { api } from '../../api-client'

export type Member = {
  id: string
  name: string | null
  email: string
  role: Role
  avatarUrl: string | null
  userId: string
}

type GetMembersRequestResponse = {
  members: Member[]
}

export async function getMembersRequest(
  organization: string,
): Promise<GetMembersRequestResponse> {
  const result = await api
    .get(`organizations/${organization}/members`, {
      next: {
        tags: [`${organization}/members`],
      },
    })
    .json<GetMembersRequestResponse>()

  return result
}
