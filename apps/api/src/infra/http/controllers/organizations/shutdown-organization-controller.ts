import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeShutdownOrganizationUseCase } from '@/modules/organizations/factories/make-shutdown-organization-use-case'

type FastifyRequestWithBody = FastifyRequest<{
  Params: {
    slug: string
  }
}>

export class ShutdownOrganizationController {
  async handle(request: FastifyRequestWithBody, reply: FastifyReply) {
    const { slug } = request.params
    const userId = await request.getCurrentUserId()
    const { membership, organization } = await request.getUserMembership(slug)

    const useCase = makeShutdownOrganizationUseCase()
    await useCase.execute({ userId, membership, organization })

    return reply.status(204).send()
  }
}
