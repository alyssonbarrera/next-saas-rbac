import { z } from 'zod'

export const organizationSchema = z
  .object({
    name: z
      .string({
        message: 'Please, provide a valid name.',
      })
      .min(4, {
        message: 'Please, include at least 4 characters.',
      }),
    domain: z
      .string({
        message: 'Please, provide a valid domain.',
      })
      .nullable()
      .refine(
        (value) => {
          if (value) {
            const domainRegex = /^[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}$/

            return domainRegex.test(value)
          }

          return true
        },
        {
          message: 'Please, enter a valid domain.',
        },
      ),
    shouldAttachUsersByDomain: z
      .union([z.literal('on'), z.literal('off'), z.boolean()])
      .transform((value) => value === 'on' || value === true)
      .default(false),
  })
  .refine(
    (data) => {
      if (data.shouldAttachUsersByDomain && !data.domain) {
        return false
      }

      return true
    },
    {
      message: 'Domain is required when auto-join is enabled.',
      path: ['domain'],
    },
  )

export type OrganizationSchema = z.infer<typeof organizationSchema>
