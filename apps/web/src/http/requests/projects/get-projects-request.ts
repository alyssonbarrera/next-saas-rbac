import { api } from '../../api-client'

export type Project = {
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
}

type GetProjectsRequestResponse = {
  projects: Project[]
}

export async function getProjectsRequest(
  organization: string,
): Promise<GetProjectsRequestResponse> {
  const result = await api
    .get(`organizations/${organization}/projects`, {
      next: {
        tags: [`${organization}/projects`],
      },
    })
    .json<GetProjectsRequestResponse>()

  return result
}
