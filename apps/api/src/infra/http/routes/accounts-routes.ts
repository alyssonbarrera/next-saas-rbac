import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { AuthenticateWithPasswordController } from '../controllers/accounts/authenticate-with-password-controller'
import { CreateAccountController } from '../controllers/accounts/create-account-controller'

const createAccountController = new CreateAccountController()
const authenticateWithPasswordController =
  new AuthenticateWithPasswordController()

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
      },
    },
    authenticateWithPasswordController.handle,
  )
}
