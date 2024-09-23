import { Role } from '@saas/auth'

import { api } from '../../api-client'

type GetMembershipRequestResponse = {
  membership: {
    id: string
    role: Role
    userId: string
    organizationId: string
  }
}

export async function getMembershipRequest(
  organization: string,
): Promise<GetMembershipRequestResponse> {
  const result = await api
    .get(`organizations/${organization}/membership`)
    .json<GetMembershipRequestResponse>()

  return result
}
