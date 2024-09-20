import { api } from '../../api-client'

type SignUpWithEmailAndPasswordRequestParams = {
  name: string
  email: string
  password: string
}

type SignUpWithEmailAndPasswordRequestResponse = void

export async function signUpWithEmailAndPasswordRequest({
  email,
  password,
}: SignUpWithEmailAndPasswordRequestParams): Promise<SignUpWithEmailAndPasswordRequestResponse> {
  await api
    .post('users', {
      json: {
        email,
        password,
      },
    })
    .json<SignUpWithEmailAndPasswordRequestResponse>()
}
