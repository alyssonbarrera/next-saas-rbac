import { FastifyInstance } from 'fastify'
import fastifyPlugin from 'fastify-plugin'

import { AppError } from '@/core/errors/app-error'
import { makeGetMembershipUseCase } from '@/modules/organizations/factories/make-get-membership-use-case'

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

    request.getUserMembership = async (slug: string) => {
      const userId = await request.getCurrentUserId()
      const getMembershipUseCase = makeGetMembershipUseCase()

      const member = await getMembershipUseCase.execute({
        userId,
        organizationSlug: slug,
      })

      if (!member) {
        throw new AppError('You are not a member of this organization.', 403)
      }

      const { organization, membership } = member

      return {
        membership,
        organization,
      }
    }
  })
})
