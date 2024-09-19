import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetInvitesUseCase } from '@/modules/invites/factories/make-get-invites-use-case'

type FastifyRequestWithBody = FastifyRequest<{
  Params: { organizationSlug: string }
}>

export class GetInvitesController {
  async handle(request: FastifyRequestWithBody, reply: FastifyReply) {
    const { organizationSlug } = request.params
    const userId = await request.getCurrentUserId()
    const { membership, organization } =
      await request.getUserMembership(organizationSlug)

    const useCase = makeGetInvitesUseCase()
    const result = await useCase.execute({
      userId,
      membership,
      organization,
    })

    return reply.status(200).send(result)
  }
}
