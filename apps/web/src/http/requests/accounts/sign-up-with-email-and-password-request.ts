import { api } from '../../api-client'

type SignUpWithEmailAndPasswordRequestParams = {
  name: string
  email: string
  password: string
}

type SignUpWithEmailAndPasswordRequestResponse = void

export async function signUpWithEmailAndPasswordRequest({
  name,
  email,
  password,
}: SignUpWithEmailAndPasswordRequestParams): Promise<SignUpWithEmailAndPasswordRequestResponse> {
  await api
    .post('users', {
      json: {
        name,
        email,
        password,
      },
    })
    .json<SignUpWithEmailAndPasswordRequestResponse>()
}
