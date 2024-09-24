import { api } from '../../api-client'

type GetOrganizationRequestResponse = {
  organization: {
    id: string
    name: string
    slug: string
    ownerId: string
    domain: string | null
    avatarUrl: string | null
    shouldAttachUsersByDomain: boolean
  }
}

export async function getOrganizationRequest(
  organizationSlug: string,
): Promise<GetOrganizationRequestResponse> {
  const result = await api
    .get(`organizations/${organizationSlug}`)
    .json<GetOrganizationRequestResponse>()

  return result
}
