import { api } from '../../api-client'

type RejectInviteRequestParams = {
  inviteId: string
}

type RejectInviteRequestResponse = void

export async function rejectInviteRequest({
  inviteId,
}: RejectInviteRequestParams): Promise<RejectInviteRequestResponse> {
  await api.post(`invites/${inviteId}/reject`)
}
