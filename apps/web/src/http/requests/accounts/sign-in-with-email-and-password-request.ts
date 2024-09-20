import { api } from '../../api-client'

type SignInWithEmailAndPasswordRequestParams = {
  email: string
  password: string
}

type SignInWithEmailAndPasswordRequestResponse = {
  user: {
    id: string
    name: string | null
    email: string
    avatarUrl: string | null
  }
  token: string
}

export async function signInWithEmailAndPasswordRequest({
  email,
  password,
}: SignInWithEmailAndPasswordRequestParams): Promise<SignInWithEmailAndPasswordRequestResponse> {
  const result = await api
    .post('sessions/password', {
      json: {
        email,
        password,
      },
    })
    .json<SignInWithEmailAndPasswordRequestResponse>()

  return result
}
