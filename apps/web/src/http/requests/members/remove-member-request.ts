import { api } from '../../api-client'

type RemoveMemberRequestParams = {
  memberId: string
  organizationSlug: string
}

type RemoveMemberRequestResponse = void

export async function removeMemberRequest({
  memberId,
  organizationSlug,
}: RemoveMemberRequestParams): Promise<RemoveMemberRequestResponse> {
  await api.delete(`organizations/${organizationSlug}/members/${memberId}`)
}
