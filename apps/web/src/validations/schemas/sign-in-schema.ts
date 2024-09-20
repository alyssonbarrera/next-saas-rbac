import { z } from 'zod'

export const signInSchema = z.object({
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
})
