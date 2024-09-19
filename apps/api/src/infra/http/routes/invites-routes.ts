import { roleSchema } from '@saas/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { CreateInviteController } from '../controllers/invites/create-invite-controller'
import { GetInviteController } from '../controllers/invites/get-invite-controller'
import { GetInvitesController } from '../controllers/invites/get-invites-controller'
import { auth } from '../middlewares/auth'

const createInviteController = new CreateInviteController()
const getInviteController = new GetInviteController()
const getInvitesController = new GetInvitesController()

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
  app.withTypeProvider<ZodTypeProvider>().get(
    '/invites/:id',
    {
      schema: {
        tags: ['Invites'],
        summary: 'Get an invite',
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: z.object({
            invite: z.object({
              id: z.string().uuid(),
              email: z.string().email(),
              role: roleSchema,
              createdAt: z.date(),
              author: z
                .object({
                  id: z.string(),
                  name: z.string().nullable(),
                  avatarUrl: z.string().nullable(),
                })
                .nullable(),
              organization: z.object({
                id: z.string(),
                name: z.string(),
                avatarUrl: z.string().nullable(),
              }),
            }),
          }),
          404: z.object({
            message: z.string(),
          }),
          409: z.object({
            message: z.string(),
          }),
        },
      },
    },
    getInviteController.handle,
  )
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:organizationSlug/invites',
      {
        schema: {
          tags: ['Invites'],
          summary: 'Get all organization invites',
          security: [{ bearerAuth: [] }],
          params: z.object({
            organizationSlug: z.string(),
          }),
          response: {
            200: z.object({
              invites: z.array(
                z.object({
                  id: z.string().uuid(),
                  email: z.string().email(),
                  role: roleSchema,
                  createdAt: z.date(),
                  author: z
                    .object({
                      id: z.string(),
                      name: z.string().nullable(),
                      avatarUrl: z.string().nullable(),
                    })
                    .nullable(),
                }),
              ),
            }),
            403: z.object({
              message: z.string(),
            }),
          },
        },
      },
      getInvitesController.handle,
    )
}
