'use server'

import { cookies } from 'next/headers'

import { signUpWithEmailAndPasswordRequest } from '@/http/requests/accounts/sign-up-with-email-and-password-request'
import { acceptInviteRequest } from '@/http/requests/invites/accept-invite-request'
import { executeServerActionWithHandling } from '@/utils/execute-server-action-with-handling'
import { signUpSchema } from '@/validations/schemas/sign-up-schema'

export async function signUpWithEmailAndPassword(data: FormData) {
  const result = signUpSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { name, email, password } = result.data

  async function executeSignUp() {
    await signUpWithEmailAndPasswordRequest({
      name,
      email,
      password,
    })

    const inviteId = cookies().get('inviteId')?.value

    if (inviteId) {
      try {
        await acceptInviteRequest({ inviteId })
        cookies().delete('inviteId')
      } catch {}
    }
  }

  return await executeServerActionWithHandling({
    action: executeSignUp,
  })
}
