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
    .get(`organizations/${organization}/billing`, {
      next: {
        revalidate: 60,
      },
    })
    .json<GetBillingRequestResponse>()

  return result
}
