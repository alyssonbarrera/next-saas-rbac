import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeTransferOrganizationUseCase } from '@/modules/organizations/factories/make-transfer-organization-use-case'

type FastifyRequestWithBody = FastifyRequest<{
  Params: {
    slug: string
  }
  Body: {
    transferToUserId: string
  }
}>

export class TransferOrganizationController {
  async handle(request: FastifyRequestWithBody, reply: FastifyReply) {
    const { slug } = request.params
    const { transferToUserId } = request.body
    const userId = await request.getCurrentUserId()
    const { membership, organization } = await request.getUserMembership(slug)

    const useCase = makeTransferOrganizationUseCase()
    const result = await useCase.execute({
      userId,
      membership,
      organization,
      transferToUserId,
    })

    return reply.status(200).send(result)
  }
}
