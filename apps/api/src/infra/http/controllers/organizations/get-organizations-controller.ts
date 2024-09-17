import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetOrganizationsUseCase } from '@/modules/organizations/factories/make-get-organizations-use-case'

type FastifyRequestWithBody = FastifyRequest<{
  Params: {
    slug: string
  }
}>

export class GetOrganizationsController {
  async handle(request: FastifyRequestWithBody, reply: FastifyReply) {
    const userId = await request.getCurrentUserId()

    const useCase = makeGetOrganizationsUseCase()
    const result = await useCase.execute({ userId })

    return reply.status(200).send(result)
  }
}
