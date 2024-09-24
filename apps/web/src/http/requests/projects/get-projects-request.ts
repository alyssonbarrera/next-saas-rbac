import { api } from '../../api-client'

type GetProjectsRequestResponse = {
  projects: {
    id: string
    name: string
    slug: string
    description: string
    avatarUrl: string | null
    organizationId: string
    ownerId: string
    createdAt: string
    updatedAt: string
    owner: {
      id: string
      name: string | null
      avatarUrl: string | null
    }
  }[]
}

export async function getProjectsRequest(
  organization: string,
): Promise<GetProjectsRequestResponse> {
  const result = await api
    .get(`organizations/${organization}/projects`)
    .json<GetProjectsRequestResponse>()

  return result
}
