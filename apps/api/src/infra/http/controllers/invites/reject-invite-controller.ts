import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeRejectInviteUseCase } from '@/modules/invites/factories/make-reject-invite-use-case'

type FastifyRequestWithBody = FastifyRequest<{
  Params: { id: string }
}>

export class RejectInviteController {
  async handle(request: FastifyRequestWithBody, reply: FastifyReply) {
    const { id } = request.params
    const userId = await request.getCurrentUserId()

    const useCase = makeRejectInviteUseCase()
    await useCase.execute({
      id,
      userId,
    })

    return reply.status(204).send()
  }
}
