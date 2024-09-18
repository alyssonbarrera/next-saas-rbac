import { roleSchema } from '@saas/auth'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { GetMembersController } from '../controllers/members/get-members-controller'
import { UpdateMemberController } from '../controllers/members/update-member-controller'
import { auth } from '../middlewares/auth'

const getMembersController = new GetMembersController()
const updateMemberController = new UpdateMemberController()

export async function membersRoutes(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:slug/members',
      {
        schema: {
          tags: ['Members'],
          summary: 'Get all organization members',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            200: z.object({
              members: z.array(
                z.object({
                  id: z.string().uuid(),
                  name: z.string().nullable(),
                  email: z.string().email(),
                  role: roleSchema,
                  avatarUrl: z.string().url().nullable(),
                  userId: z.string().uuid(),
                }),
              ),
            }),
            403: z.object({
              message: z.string(),
            }),
          },
        },
      },
      getMembersController.handle,
    )
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/organizations/:slug/members/:memberId',
      {
        schema: {
          tags: ['Members'],
          summary: 'Update a member',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
            memberId: z.string().uuid(),
          }),
          body: z.object({
            role: roleSchema,
          }),
          response: {
            200: z.object({
              member: z.object({
                id: z.string().uuid(),
                role: roleSchema,
                organizationId: z.string().uuid(),
                userId: z.string().uuid(),
              }),
            }),
            403: z.object({
              message: z.string(),
            }),
          },
        },
      },
      updateMemberController.handle,
    )
}
