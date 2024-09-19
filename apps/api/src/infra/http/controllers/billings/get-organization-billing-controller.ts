import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetOrganizationBillingUseCase } from '@/modules/billings/factories/make-get-organization-billing-use-case'

type FastifyRequestWithBody = FastifyRequest<{
  Params: {
    slug: string
  }
}>

export class GetOrganizationBillingController {
  async handle(request: FastifyRequestWithBody, reply: FastifyReply) {
    const { slug } = request.params
    const userId = await request.getCurrentUserId()
    const { organization, membership } = await request.getUserMembership(slug)

    const useCase = makeGetOrganizationBillingUseCase()
    const result = await useCase.execute({
      userId,
      membership,
      organization,
    })

    return reply.status(200).send(result)
  }
}
