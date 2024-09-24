import { z } from 'zod'

export const createProjectSchema = z.object({
  name: z
    .string({
      message: 'Please, provide a valid name.',
    })
    .min(4, {
      message: 'Please, include at least 4 characters.',
    }),
  description: z.string().min(4, {
    message: 'Please, include at least 4 characters.',
  }),
})
