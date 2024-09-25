import { api } from '../../api-client'

type TransferOwnershipRequestParams = {
  organizationSlug: string
  transferToUserId: string
}

type TransferOwnershipRequestResponse = void

export async function transferOwnershipRequest({
  organizationSlug,
  transferToUserId,
}: TransferOwnershipRequestParams): Promise<TransferOwnershipRequestResponse> {
  await api.patch(`organizations/${organizationSlug}/owner`, {
    json: {
      transferToUserId,
    },
  })
}
