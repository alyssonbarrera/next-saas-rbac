import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { AuthenticateWithPasswordController } from '../controllers/accounts/authenticate-with-password-controller'
import { CreateAccountController } from '../controllers/accounts/create-account-controller'
import { GetProfileController } from '../controllers/accounts/get-profile-controller'
import { auth } from '../middlewares/auth'

const createAccountController = new CreateAccountController()
const authenticateWithPasswordController =
  new AuthenticateWithPasswordController()
const getProfileController = new GetProfileController()

export async function accountsRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Create a new account',
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string().min(6),
        }),
      },
    },
    createAccountController.handle,
  )
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions/password',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Authenticate with email and password',
        body: z.object({
          email: z.string().email(),
          password: z.string().min(6),
        }),
        response: {
          201: z.object({
            user: z.object({
              id: z.string().uuid(),
              name: z.string().nullable(),
              email: z.string(),
              avatarUrl: z.string().url().nullable(),
            }),
            token: z.string(),
          }),
          401: z.object({
            message: z.string(),
          }),
        },
      },
    },
    authenticateWithPasswordController.handle,
  )
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/profile',
      {
        schema: {
          tags: ['Auth'],
          summary: 'Get authenticated user profile',
          response: {
            200: z.object({
              user: z.object({
                id: z.string().uuid(),
                name: z.string().nullable(),
                email: z.string(),
                avatarUrl: z.string().url().nullable(),
              }),
            }),
            400: z.object({
              message: z.string(),
            }),
          },
        },
      },
      getProfileController.handle,
    )
}
