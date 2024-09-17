import { FastifyInstance } from 'fastify'
import fastifyPlugin from 'fastify-plugin'

import { AppError } from '@/core/errors/app-error'

export const auth = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request) => {
    request.getCurrentUserId = async () => {
      try {
        const { sub } = await request.jwtVerify<{ sub: string }>()

        return sub
      } catch (error) {
        throw new AppError('Invalid auth token.', 401)
      }
    }
  })
})
