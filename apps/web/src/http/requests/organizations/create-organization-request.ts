import { api } from '../../api-client'

type CreateOrganizationRequestParams = {
  name: string
  domain?: string | null
  avatarUrl?: string | null
  shouldAttachUsersByDomain: boolean
}

type CreateOrganizationRequestResponse = {
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

export async function createOrganizationRequest({
  name,
  domain,
  shouldAttachUsersByDomain,
}: CreateOrganizationRequestParams): Promise<CreateOrganizationRequestResponse> {
  const result = await api
    .post('organizations', {
      json: {
        name,
        domain,
        shouldAttachUsersByDomain,
      },
    })
    .json<CreateOrganizationRequestResponse>()

  return result
}
