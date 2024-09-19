import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetPendingInvitesUseCase } from '@/modules/invites/factories/make-get-pending-invites-use-case'

export class GetPendingInvitesController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = await request.getCurrentUserId()

    const useCase = makeGetPendingInvitesUseCase()
    const result = await useCase.execute({
      userId,
    })

    return reply.status(200).send(result)
  }
}
