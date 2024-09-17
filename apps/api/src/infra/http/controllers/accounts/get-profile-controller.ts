import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetProfileUseCase } from '@/modules/accounts/factories/make-get-profile-use-case'

type FastifyRequestWithBody = FastifyRequest<{
  Body: {
    email: string
    password: string
  }
}>

export class GetProfileController {
  async handle(request: FastifyRequestWithBody, reply: FastifyReply) {
    const useCase = makeGetProfileUseCase()

    const sub = await request.getCurrentUserId()
    const result = await useCase.execute({ id: sub })

    return reply.status(201).send(result)
  }
}
