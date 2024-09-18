import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeUpdateOrganizationUseCase } from '@/modules/organizations/factories/make-update-organization-use-case'
import type { UpdateOrganizationUseCaseRequest } from '@/modules/organizations/use-cases/update-organization-use-case'

type FastifyRequestWithBody = FastifyRequest<{
  Params: { slug: string }
  Body: UpdateOrganizationUseCaseRequest['data']
}>

export class UpdateOrganizationController {
  async handle(request: FastifyRequestWithBody, reply: FastifyReply) {
    const { slug } = request.params
    const userId = await request.getCurrentUserId()
    const { membership, organization } = await request.getUserMembership(slug)

    const useCase = makeUpdateOrganizationUseCase()

    const { name, domain, avatarUrl, shouldAttachUsersByDomain } = request.body
    const result = await useCase.execute({
      userId,
      membership,
      organization,
      data: { name, domain, avatarUrl, shouldAttachUsersByDomain },
    })

    return reply.status(200).send({
      organization: {
        name: result.organization.name,
        domain: result.organization.domain,
        avatarUrl: result.organization.avatarUrl,
        shouldAttachUsersByDomain:
          result.organization.shouldAttachUsersByDomain,
      },
    })
  }
}
