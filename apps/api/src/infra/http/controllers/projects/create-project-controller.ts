import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeCreateProjectUseCase } from '@/modules/projects/factories/make-create-project-use-case'
import type { CreateProjectUseCaseRequest } from '@/modules/projects/use-cases/create-project-use-case'

type FastifyRequestWithBody = FastifyRequest<{
  Params: { slug: string }
  Body: Pick<CreateProjectUseCaseRequest, 'name' | 'description' | 'avatarUrl'>
}>

export class CreateProjectController {
  async handle(request: FastifyRequestWithBody, reply: FastifyReply) {
    const { slug } = request.params
    const userId = await request.getCurrentUserId()
    const { membership, organization } = await request.getUserMembership(slug)

    const { name, description, avatarUrl } = request.body

    const useCase = makeCreateProjectUseCase()
    const result = await useCase.execute({
      name,
      avatarUrl,
      description,
      userId,
      membership,
      organization,
    })

    reply.code(201).send(result)
  }
}
