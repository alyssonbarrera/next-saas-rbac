import { roleSchema } from '@saas/auth'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { CreateOrganizationController } from '../controllers/organizations/create-organization-controller'
import { GetMembershipController } from '../controllers/organizations/get-membership-controller'
import { GetOrganizationController } from '../controllers/organizations/get-organization-controller'
import { GetOrganizationsController } from '../controllers/organizations/get-organizations-controller'
import { ShutdownOrganizationController } from '../controllers/organizations/shutdown-organization-controller'
import { TransferOrganizationController } from '../controllers/organizations/transfer-organization-controller'
import { UpdateOrganizationController } from '../controllers/organizations/update-organization-controller'
import { auth } from '../middlewares/auth'

const createOrganizationController = new CreateOrganizationController()
const getMembershipController = new GetMembershipController()
const getOrganizationsController = new GetOrganizationsController()
const getOrganizationController = new GetOrganizationController()
const updateOrganizationController = new UpdateOrganizationController()
const shutdownOrganizationController = new ShutdownOrganizationController()
const transferOrganizationController = new TransferOrganizationController()

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
                slug: z.string(),
                ownerId: z.string().uuid(),
                domain: z.string().nullable(),
                avatarUrl: z.string().url().nullable(),
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
                userId: z.string().uuid(),
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
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations',
      {
        schema: {
          tags: ['Organizations'],
          summary: 'Get organizations where user is a member',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.object({
              organizations: z.array(
                z.object({
                  id: z.string().uuid(),
                  name: z.string(),
                  slug: z.string(),
                  role: roleSchema,
                  domain: z.string().nullable(),
                  avatarUrl: z.string().url().nullable(),
                }),
              ),
            }),
          },
        },
      },
      getOrganizationsController.handle,
    )
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/organizations/:slug',
      {
        schema: {
          tags: ['Organizations'],
          summary: 'Get details from organization',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            200: z.object({
              organization: z.object({
                id: z.string().uuid(),
                name: z.string(),
                domain: z.string().nullable(),
                avatarUrl: z.string().url().nullable(),
                slug: z.string(),
                ownerId: z.string().uuid(),
                shouldAttachUsersByDomain: z.boolean(),
              }),
            }),
            404: z.object({
              message: z.string(),
            }),
          },
        },
      },
      getOrganizationController.handle,
    )
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
      '/organizations/:slug',
      {
        schema: {
          tags: ['Organizations'],
          summary: 'Update a organization',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          body: z.object({
            name: z.string().nullish(),
            domain: z.string().nullish(),
            avatarUrl: z.string().nullish(),
            shouldAttachUsersByDomain: z.boolean().nullish(),
          }),
          response: {
            200: z.object({
              organization: z.object({
                name: z.string(),
                domain: z.string().nullable(),
                avatarUrl: z.string().url().nullable(),
                shouldAttachUsersByDomain: z.boolean(),
              }),
            }),
            403: z.object({
              message: z.string(),
            }),
          },
        },
      },
      updateOrganizationController.handle,
    )
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/organizations/:slug',
      {
        schema: {
          tags: ['Organizations'],
          summary: 'Delete a organization',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            204: z.object({
              organization: z.object({
                id: z.string().uuid(),
                name: z.string(),
                domain: z.string().nullable(),
                avatarUrl: z.string().url().nullable(),
                slug: z.string(),
                ownerId: z.string().uuid(),
                shouldAttachUsersByDomain: z.boolean(),
              }),
            }),
            403: z.object({
              message: z.string(),
            }),
          },
        },
      },
      shutdownOrganizationController.handle,
    )
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .patch(
      '/organizations/:slug/owner',
      {
        schema: {
          tags: ['Organizations'],
          summary: 'Transfer a organization ownership',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          body: z.object({
            transferToUserId: z.string().uuid(),
          }),
          response: {
            200: z.null(),
            403: z.object({
              message: z.string(),
            }),
          },
        },
      },
      transferOrganizationController.handle,
    )
}
