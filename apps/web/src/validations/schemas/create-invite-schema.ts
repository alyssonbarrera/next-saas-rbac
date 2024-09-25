import { roleSchema } from '@saas/auth'
import { z } from 'zod'

export const createInviteSchema = z.object({
  email: z.string().email({
    message: 'Please, provide a valid e-mail address.',
  }),
  role: roleSchema,
})
