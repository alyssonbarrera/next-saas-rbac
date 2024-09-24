import { api } from '../../api-client'

type GetBillingRequestResponse = {
  billing: {
    seats: {
      amount: number
      unit: number
      price: number
    }
    projects: {
      amount: number
      unit: number
      price: number
    }
    total: number
  }
}

export async function getBillingRequest(
  organization: string,
): Promise<GetBillingRequestResponse> {
  const result = await api
    .get(`organizations/${organization}/billing`)
    .json<GetBillingRequestResponse>()

  return result
}
