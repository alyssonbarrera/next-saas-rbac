'use server'

import { passwordRecoverRequest } from '@/http/requests/accounts/password-recover-request'
import { executeServerActionWithHandling } from '@/utils/execute-server-action-with-handling'
import { forgotPasswordSchema } from '@/validations/schemas/forgot-password-schema'

export async function forgotPasswordAction(data: FormData) {
  const result = forgotPasswordSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { email } = result.data

  return await executeServerActionWithHandling({
    action: passwordRecoverRequest.bind(null, { email }),
    successMessage: 'Password recovery request sent successfully.',
  })
}
