'use server'

import { cookies } from 'next/headers'

import { signInWithEmailAndPasswordRequest } from '@/http/requests/accounts/sign-in-with-email-and-password-request'
import { acceptInviteRequest } from '@/http/requests/invites/accept-invite-request'
import { executeServerActionWithHandling } from '@/utils/execute-server-action-with-handling'
import { signInSchema } from '@/validations/schemas/sign-in-schema'

export async function signInWithEmailAndPassword(data: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { email, password } = result.data

  async function executeSignIn() {
    const { token } = await signInWithEmailAndPasswordRequest({
      email,
      password,
    })

    const cookieStore = await cookies()

    cookieStore.set('token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    const inviteId = cookieStore.get('inviteId')?.value

    if (inviteId) {
      try {
        await acceptInviteRequest({ inviteId })
        cookieStore.delete('inviteId')
      } catch {}
    }
  }

  return await executeServerActionWithHandling({
    action: executeSignIn,
  })
}
