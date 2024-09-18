import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetProjectUseCase } from '@/modules/projects/factories/make-get-project-use-case'

type FastifyRequestWithBody = FastifyRequest<{
  Params: { organizationSlug: string; projectSlug: string }
}>

export class GetProjectController {
  async handle(request: FastifyRequestWithBody, reply: FastifyReply) {
    const { projectSlug, organizationSlug } = request.params
    const userId = await request.getCurrentUserId()
    const { membership, organization } =
      await request.getUserMembership(organizationSlug)

    const useCase = makeGetProjectUseCase()
    const result = await useCase.execute({
      userId,
      membership,
      organization,
      slug: projectSlug,
    })

    reply.code(200).send(result)
  }
}
