import { api } from '../../api-client'

type UpdateOrganizationRequestParams = {
  name: string
  domain?: string | null
  organizationSlug: string
  avatarUrl?: string | null
  shouldAttachUsersByDomain: boolean
}

type UpdateOrganizationRequestResponse = {
  organization: {
    name: string
    domain: string | null
    avatarUrl: string | null
    shouldAttachUsersByDomain: boolean
  }
}

export async function updateOrganizationRequest({
  name,
  domain,
  organizationSlug,
  shouldAttachUsersByDomain,
}: UpdateOrganizationRequestParams): Promise<UpdateOrganizationRequestResponse> {
  const result = await api
    .put(`organizations/${organizationSlug}`, {
      json: {
        name,
        domain,
        shouldAttachUsersByDomain,
      },
    })
    .json<UpdateOrganizationRequestResponse>()

  return result
}
