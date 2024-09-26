import { api } from '../../api-client'
import { Project } from './get-projects-request'

type GetProjectRequestParams = {
  projectSlug: string
  organizationSlug: string
}

type GetProjectRequestResponse = {
  project: Project
}

export async function getProjectRequest({
  projectSlug,
  organizationSlug,
}: GetProjectRequestParams): Promise<GetProjectRequestResponse> {
  const result = await api
    .get(`organizations/${organizationSlug}/projects/${projectSlug}`, {
      next: {
        tags: [`${organizationSlug}/project/${projectSlug}`],
      },
    })
    .json<GetProjectRequestResponse>()

  return result
}
