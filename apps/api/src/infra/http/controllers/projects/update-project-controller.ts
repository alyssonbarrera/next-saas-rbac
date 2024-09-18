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

    return reply.status(201).send({
      project: {
        id: result.project.id,
        name: result.project.name,
        slug: result.project.slug,
        description: result.project.description,
        avatarUrl: result.project.avatarUrl,
        ownerId: result.project.ownerId,
        organizationId: result.project.organizationId,
        createdAt: result.project.createdAt,
        updatedAt: result.project.updatedAt,
      },
    })
  }
}
