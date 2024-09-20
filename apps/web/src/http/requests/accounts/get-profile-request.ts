import { api } from '../../api-client'

type GetProfileRequestResponse = {
  user: {
    id: string
    name: string | null
    email: string
    avatarUrl: string | null
  }
}

export async function getProfileRequest(): Promise<GetProfileRequestResponse> {
  const result = await api.get('profile').json<GetProfileRequestResponse>()

  return result
}
