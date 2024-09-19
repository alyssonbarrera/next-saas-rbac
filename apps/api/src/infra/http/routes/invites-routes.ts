import { roleSchema } from '@saas/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { CreateInviteController } from '../controllers/invites/create-invite-controller'
import { auth } from '../middlewares/auth'

const createInviteController = new CreateInviteController()

export async function invitesRoutes(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/organizations/:slug/invites',
      {
        schema: {
          tags: ['Invites'],
          summary: 'Create a new invite',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          body: z.object({
            email: z.string().email(),
            role: roleSchema,
          }),
          response: {
            201: z.object({
              invite: z.object({
                id: z.string().uuid(),
                email: z.string().email(),
                role: roleSchema,
                authorId: z.string().nullable(),
                organizationId: z.string(),
                createdAt: z.date(),
              }),
            }),
            403: z.object({
              message: z.string(),
            }),
            409: z.object({
              message: z.string(),
            }),
          },
        },
      },
      createInviteController.handle,
    )
}
