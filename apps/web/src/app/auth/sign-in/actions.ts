'use server'

import { HTTPError } from 'ky'
import { cookies } from 'next/headers'

import { signInWithEmailAndPasswordRequest } from '@/http/requests/accounts/sign-in-with-email-and-password-request'
import { acceptInviteRequest } from '@/http/requests/invites/accept-invite-request'
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

  try {
    const { token } = await signInWithEmailAndPasswordRequest({
      email,
      password,
    })

    cookies().set('token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    const inviteId = cookies().get('inviteId')?.value

    if (inviteId) {
      try {
        await acceptInviteRequest({ inviteId })
        cookies().delete('inviteId')
      } catch {}
    }
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()

      return {
        success: false,
        message,
        errors: null,
      }
    }

    console.error(error)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return {
    success: true,
    message: null,
    errors: null,
  }
}
