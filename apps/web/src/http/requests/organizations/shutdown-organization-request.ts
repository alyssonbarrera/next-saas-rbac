import { api } from '../../api-client'

type ShutdownOrganizationRequestResponse = void

export async function shutdownOrganizationRequest(
  organizationSlug: string,
): Promise<ShutdownOrganizationRequestResponse> {
  await api.delete(`organizations/${organizationSlug}`)
}
