import { z } from 'zod'

export const forgotPasswordSchema = z.object({
  email: z.string().email({
    message: 'Please, provide a valid e-mail address.',
  }),
})
