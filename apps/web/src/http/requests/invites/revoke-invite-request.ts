import { api } from '../../api-client'

type RevokeInviteRequestParams = {
  inviteId: string
  organizationSlug: string
}

type RevokeInviteRequestResponse = void

export async function revokeInviteRequest({
  inviteId,
  organizationSlug,
}: RevokeInviteRequestParams): Promise<RevokeInviteRequestResponse> {
  await api
    .delete(`organizations/${organizationSlug}/invites/${inviteId}`)
    .json()
}
