import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeCreateOrganizationUseCase } from '@/modules/organizations/factories/make-create-organization-use-case'
import type { CreateOrganizationUseCaseRequest } from '@/modules/organizations/use-cases/create-organization-use-case'

type FastifyRequestWithBody = FastifyRequest<{
  Body: Omit<CreateOrganizationUseCaseRequest, 'userId'>
}>

export class CreateOrganizationController {
  async handle(request: FastifyRequestWithBody, reply: FastifyReply) {
    const useCase = makeCreateOrganizationUseCase()

    const userId = await request.getCurrentUserId()

    const { name, domain, avatarUrl, shouldAttachUsersByDomain } = request.body
    const result = await useCase.execute({
      name,
      domain,
      userId,
      avatarUrl,
      shouldAttachUsersByDomain,
    })

    return reply.status(201).send(result)
  }
}
