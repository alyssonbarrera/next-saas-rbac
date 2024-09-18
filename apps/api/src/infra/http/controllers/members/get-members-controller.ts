import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetMembersUseCase } from '@/modules/members/factories/make-get-members-use-case'

type FastifyRequestWithBody = FastifyRequest<{
  Params: { slug: string }
}>

export class GetMembersController {
  async handle(request: FastifyRequestWithBody, reply: FastifyReply) {
    const { slug } = request.params
    const userId = await request.getCurrentUserId()
    const { membership, organization } = await request.getUserMembership(slug)

    const useCase = makeGetMembersUseCase()
    const { members } = await useCase.execute({
      userId,
      membership,
      organization,
    })

    const membersWithRoles = members.map(
      ({ user: { id: userId, ...user }, ...member }) => ({
        ...member,
        ...user,
        userId,
      }),
    )

    reply.code(200).send({ members: membersWithRoles })
  }
}
