import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeAcceptInviteUseCase } from '@/modules/invites/factories/make-accept-invite-use-case'

type FastifyRequestWithBody = FastifyRequest<{
  Params: { id: string }
}>

export class AcceptInviteController {
  async handle(request: FastifyRequestWithBody, reply: FastifyReply) {
    const { id } = request.params
    const userId = await request.getCurrentUserId()

    const useCase = makeAcceptInviteUseCase()
    await useCase.execute({
      id,
      userId,
    })

    return reply.status(204).send()
  }
}
