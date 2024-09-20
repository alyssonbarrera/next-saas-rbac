'use server'

import { HTTPError } from 'ky'

import { signInWithEmailAndPasswordRequest } from '@/http/requests/accounts/sign-in-with-email-and-password-request'
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
    const response = await signInWithEmailAndPasswordRequest({
      email,
      password,
    })

    console.log(response)
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
