import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeDeleteProjectUseCase } from '@/modules/projects/factories/make-delete-project-use-case'

type FastifyRequestWithBody = FastifyRequest<{
  Params: { projectId: string; slug: string }
}>

export class DeleteProjectController {
  async handle(request: FastifyRequestWithBody, reply: FastifyReply) {
    const { slug, projectId } = request.params
    const userId = await request.getCurrentUserId()
    const { membership, organization } = await request.getUserMembership(slug)

    const useCase = makeDeleteProjectUseCase()
    await useCase.execute({
      id: projectId,
      userId,
      membership,
      organization,
    })

    reply.code(204).send()
  }
}
