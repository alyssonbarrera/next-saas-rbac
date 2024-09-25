'use server'

import { HTTPError } from 'ky'
import { cookies } from 'next/headers'

import { signUpWithEmailAndPasswordRequest } from '@/http/requests/accounts/sign-up-with-email-and-password-request'
import { acceptInviteRequest } from '@/http/requests/invites/accept-invite-request'
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

  try {
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
