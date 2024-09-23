import { Role } from '@saas/auth'

import { api } from '../../api-client'

type GetOrganizationsRequestResponse = {
  organizations: {
    id: string
    name: string
    slug: string
    role: Role
    domain: string | null
    avatarUrl: string | null
  }[]
}

export async function getOrganizationsRequest(): Promise<GetOrganizationsRequestResponse> {
  const result = await api
    .get('organizations', {
      next: {
        tags: ['organizations'],
      },
    })
    .json<GetOrganizationsRequestResponse>()

  return result
}
