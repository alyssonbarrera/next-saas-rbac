import { api } from '../../api-client'

type AcceptInviteRequestParams = {
  inviteId: string
}

type AcceptInviteRequestResponse = void

export async function acceptInviteRequest({
  inviteId,
}: AcceptInviteRequestParams): Promise<AcceptInviteRequestResponse> {
  await api.post(`invites/${inviteId}/accept`)
}
