import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetInviteUseCase } from '@/modules/invites/factories/make-get-invite-use-case'

type FastifyRequestWithBody = FastifyRequest<{
  Params: { id: string }
}>

export class GetInviteController {
  async handle(request: FastifyRequestWithBody, reply: FastifyReply) {
    const { id } = request.params

    const useCase = makeGetInviteUseCase()
    const result = await useCase.execute({
      id,
    })

    return reply.status(200).send(result)
  }
}
