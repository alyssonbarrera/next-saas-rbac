import { api } from '../../api-client'

type CreateProjectRequestParams = {
  name: string
  organizationSlug: string
  avatarUrl?: string | null
  description?: string | null
}

type CreateProjectRequestResponse = {
  project: {
    id: string
    name: string
    slug: string
    description: string
    avatarUrl: string | null
    organizationId: string
    ownerId: string
    createdAt: string
    updatedAt: string
  }
}

export async function createProjectRequest({
  name,
  description,
  organizationSlug,
}: CreateProjectRequestParams): Promise<CreateProjectRequestResponse> {
  const result = await api
    .post(`organizations/${organizationSlug}/projects`, {
      json: {
        name,
        description,
      },
    })
    .json<CreateProjectRequestResponse>()

  return result
}
