import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeUpdateMemberUseCase } from '@/modules/members/factories/make-update-member-use-case'
import type { UpdateMemberUseCaseRequest } from '@/modules/members/use-cases/update-member-use-case'

type FastifyRequestWithBody = FastifyRequest<{
  Params: { slug: string; memberId: string }
  Body: UpdateMemberUseCaseRequest['data']
}>

export class UpdateMemberController {
  async handle(request: FastifyRequestWithBody, reply: FastifyReply) {
    const { slug, memberId } = request.params
    const userId = await request.getCurrentUserId()
    const { membership, organization } = await request.getUserMembership(slug)

    const useCase = makeUpdateMemberUseCase()

    const { role } = request.body
    const result = await useCase.execute({
      userId,
      memberId,
      membership,
      organization,
      data: { role },
    })

    return reply.status(200).send(result)
  }
}
