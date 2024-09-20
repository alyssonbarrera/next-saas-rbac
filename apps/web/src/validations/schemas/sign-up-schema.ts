import { z } from 'zod'

export const signUpSchema = z
  .object({
    name: z
      .string({
        message: 'Please, provide a valid name.',
      })
      .refine((value) => value.split(' ').length > 1, {
        message: 'Please, enter your full name.',
      }),
    email: z
      .string({
        message: 'Please, provide a valid e-mail address.',
      })
      .email({
        message: 'Please, provide a valid e-mail address.',
      }),
    password: z
      .string({
        message: 'Please, provide a valid password.',
      })
      .min(6, {
        message: 'Please, provide a password with at least 6 characters.',
      }),
    password_confirmation: z
      .string({
        message: 'Please, provide a valid password.',
      })
      .min(6, {
        message: 'Please, provide a password with at least 6 characters.',
      }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Password confirmation does not match.',
    path: ['password_confirmation'],
  })
