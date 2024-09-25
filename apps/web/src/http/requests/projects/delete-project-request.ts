import { api } from '../../api-client'

type DeleteProjectRequestParams = {
  organizationSlug: string
  projectId: string
}

type DeleteProjectRequestResponse = void
export async function deleteProjectRequest({
  organizationSlug,
  projectId,
}: DeleteProjectRequestParams): Promise<DeleteProjectRequestResponse> {
  await api.delete(`organizations/${organizationSlug}/projects/${projectId}`)
}
