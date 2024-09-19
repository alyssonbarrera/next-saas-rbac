import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { GetOrganizationBillingController } from '../controllers/billings/get-organization-billing-controller'
import { auth } from '../middlewares/auth'

const getOrganizationBillingController = new GetOrganizationBillingController()

export async function billingsRoutes(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:slug/billing',
      {
        schema: {
          tags: ['Billings'],
          summary: 'Get billing information from organization',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            200: z.object({
              billing: z.object({
                seats: z.object({
                  amount: z.number(),
                  unit: z.number(),
                  price: z.number(),
                }),
                projects: z.object({
                  amount: z.number(),
                  unit: z.number(),
                  price: z.number(),
                }),
                total: z.number(),
              }),
            }),
            403: z.object({
              message: z.string(),
            }),
          },
        },
      },
      getOrganizationBillingController.handle,
    )
}
