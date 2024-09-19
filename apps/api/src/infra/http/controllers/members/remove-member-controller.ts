import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeRemoveMemberUseCase } from '@/modules/members/factories/make-remove-member-use-case'

type FastifyRequestWithBody = FastifyRequest<{
  Params: { slug: string; memberId: string }
}>

export class RemoveMemberController {
  async handle(request: FastifyRequestWithBody, reply: FastifyReply) {
    const { slug, memberId } = request.params
    const userId = await request.getCurrentUserId()
    const { membership, organization } = await request.getUserMembership(slug)

    const useCase = makeRemoveMemberUseCase()
    await useCase.execute({
      userId,
      memberId,
      membership,
      organization,
    })

    reply.code(204).send()
  }
}
