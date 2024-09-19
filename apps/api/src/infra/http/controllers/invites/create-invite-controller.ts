import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeCreateInviteUseCase } from '@/modules/invites/factories/make-create-invite-use-case'
import type { CreateInviteUseCaseRequest } from '@/modules/invites/use-cases/create-invite-use-case'

type FastifyRequestWithBody = FastifyRequest<{
  Params: { slug: string }
  Body: Omit<
    CreateInviteUseCaseRequest,
    'userId' | 'membership' | 'organization'
  >
}>

export class CreateInviteController {
  async handle(request: FastifyRequestWithBody, reply: FastifyReply) {
    const { slug } = request.params
    const userId = await request.getCurrentUserId()
    const { membership, organization } = await request.getUserMembership(slug)

    const { role, email } = request.body

    const useCase = makeCreateInviteUseCase()
    const result = await useCase.execute({
      role,
      email,
      userId,
      membership,
      organization,
    })

    return reply.status(201).send(result)
  }
}
