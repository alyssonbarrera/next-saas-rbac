import { api } from '../../api-client'

type PasswordResetRequestParams = {
  code: string
  email: string
}

type PasswordResetRequestResponse = void

export async function passwordResetRequest({
  email,
  code,
}: PasswordResetRequestParams): Promise<PasswordResetRequestResponse> {
  await api.post('password/reset', {
    json: {
      email,
      code,
    },
  })
}
