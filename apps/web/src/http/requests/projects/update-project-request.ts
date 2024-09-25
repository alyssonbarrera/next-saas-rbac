import { api } from '../../api-client'

type UpdateProjectRequestParams = {
  name?: string
  projectSlug: string
  organizationSlug: string
  avatarUrl?: string | null
  description?: string | null
}

type UpdateProjectRequestResponse = {
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

export async function updateProjectRequest({
  name,
  description,
  projectSlug,
  organizationSlug,
}: UpdateProjectRequestParams): Promise<UpdateProjectRequestResponse> {
  const result = await api
    .put(`organizations/${organizationSlug}/projects/${projectSlug}`, {
      json: {
        name,
        description,
      },
    })
    .json<UpdateProjectRequestResponse>()

  return result
}
