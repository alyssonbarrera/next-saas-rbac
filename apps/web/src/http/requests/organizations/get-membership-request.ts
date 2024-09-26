import { Role } from '@saas/auth'

import { api } from '../../api-client'

export type Membership = {
  id: string
  role: Role
  userId: string
  organizationId: string
}

type GetMembershipRequestResponse = {
  membership: Membership
}

export async function getMembershipRequest(
  organization: string,
): Promise<GetMembershipRequestResponse> {
  const result = await api
    .get(`organizations/${organization}/membership`, {
      next: {
        tags: [`${organization}/membership`],
        revalidate: 60,
      },
    })
    .json<GetMembershipRequestResponse>()

  return result
}
