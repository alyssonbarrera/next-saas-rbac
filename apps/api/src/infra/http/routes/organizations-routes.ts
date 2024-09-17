import { roleSchema } from '@saas/auth'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { CreateOrganizationController } from '../controllers/organizations/create-organization-controller'
import { GetMembershipController } from '../controllers/organizations/get-membership-controller'
import { auth } from '../middlewares/auth'

const createOrganizationController = new CreateOrganizationController()
const getMembershipController = new GetMembershipController()

export async function organizationsRoutes(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .post(
      '/organizations',
      {
        schema: {
          tags: ['Organizations'],
          summary: 'Create a new organization',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string(),
            domain: z.string().nullish(),
            avatarUrl: z.string().nullish(),
            shouldAttachUsersByDomain: z.boolean().optional(),
          }),
          response: {
            201: z.object({
              organization: z.object({
                id: z.string().uuid(),
                name: z.string(),
                domain: z.string().nullable(),
                avatarUrl: z.string().nullable(),
                slug: z.string(),
                ownerId: z.string().uuid(),
                shouldAttachUsersByDomain: z.boolean(),
              }),
            }),
            409: z.object({
              message: z.string(),
            }),
          },
        },
      },
      createOrganizationController.handle,
    )
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:slug/membership',
      {
        schema: {
          tags: ['Organizations'],
          summary: 'Get user membership on organization',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            200: z.object({
              membership: z.object({
                id: z.string().uuid(),
                role: roleSchema,
                organizationId: z.string().uuid(),
              }),
            }),
            403: z.object({
              message: z.string(),
            }),
          },
        },
      },
      getMembershipController.handle,
    )
}
