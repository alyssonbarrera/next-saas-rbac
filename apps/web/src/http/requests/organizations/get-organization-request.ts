import { api } from '../../api-client'

export type Organization = {
  id: string
  name: string
  slug: string
  ownerId: string
  domain: string | null
  avatarUrl: string | null
  shouldAttachUsersByDomain: boolean
}

type GetOrganizationRequestResponse = {
  organization: Organization
}

export async function getOrganizationRequest(
  organizationSlug: string,
): Promise<GetOrganizationRequestResponse> {
  const result = await api
    .get(`organizations/${organizationSlug}`, {
      next: {
        tags: [`organizations/${organizationSlug}`],
        revalidate: 60,
      },
    })
    .json<GetOrganizationRequestResponse>()

  return result
}
