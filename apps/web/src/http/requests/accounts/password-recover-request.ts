import { api } from '../../api-client'

type PasswordRecoverRequestParams = {
  email: string
}

type PasswordRecoverRequestResponse = void

export async function passwordRecoverRequest({
  email,
}: PasswordRecoverRequestParams): Promise<PasswordRecoverRequestResponse> {
  await api.post('password/recover', {
    json: {
      email,
    },
  })
}
