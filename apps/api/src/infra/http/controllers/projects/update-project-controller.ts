import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeUpdateProjectUseCase } from '@/modules/projects/factories/make-update-project-use-case'
import type { UpdateProjectUseCaseRequest } from '@/modules/projects/use-cases/update-project-use-case'

type FastifyRequestWithBody = FastifyRequest<{
  Params: { organizationSlug: string; projectSlug: string }
  Body: UpdateProjectUseCaseRequest['data']
}>

export class UpdateProjectController {
  async handle(request: FastifyRequestWithBody, reply: FastifyReply) {
    const { projectSlug, organizationSlug } = request.params
    const userId = await request.getCurrentUserId()
    const { membership, organization } =
      await request.getUserMembership(organizationSlug)

    const useCase = makeUpdateProjectUseCase()

    const { name, avatarUrl, description } = request.body
    const result = await useCase.execute({
      slug: projectSlug,
      userId,
      membership,
      organization,
      data: { name, avatarUrl, description },
    })

    return reply.status(200).send(result)
  }
}
