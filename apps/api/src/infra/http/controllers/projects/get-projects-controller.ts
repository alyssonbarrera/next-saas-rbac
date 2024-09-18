import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetProjectsUseCase } from '@/modules/projects/factories/make-get-projects-use-case'

type FastifyRequestWithBody = FastifyRequest<{
  Params: { organizationSlug: string }
}>

export class GetProjectsController {
  async handle(request: FastifyRequestWithBody, reply: FastifyReply) {
    const { organizationSlug } = request.params
    const userId = await request.getCurrentUserId()
    const { membership, organization } =
      await request.getUserMembership(organizationSlug)

    const useCase = makeGetProjectsUseCase()
    const result = await useCase.execute({
      userId,
      membership,
      organization,
    })

    reply.code(200).send(result)
  }
}
