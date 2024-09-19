import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeRevokeInviteUseCase } from '@/modules/invites/factories/make-revoke-invite-use-case'

type FastifyRequestWithBody = FastifyRequest<{
  Params: { id: string; organizationSlug: string }
}>

export class RevokeInviteController {
  async handle(request: FastifyRequestWithBody, reply: FastifyReply) {
    const { id, organizationSlug } = request.params
    const userId = await request.getCurrentUserId()
    const { membership, organization } =
      await request.getUserMembership(organizationSlug)

    const useCase = makeRevokeInviteUseCase()
    await useCase.execute({
      id,
      userId,
      membership,
      organization,
    })

    return reply.status(204).send()
  }
}
