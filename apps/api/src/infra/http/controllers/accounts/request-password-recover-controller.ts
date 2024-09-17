import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeRequestPasswordRecoverUseCase } from '@/modules/accounts/factories/make-request-password-recover-use-case'

type FastifyRequestWithBody = FastifyRequest<{
  Body: {
    email: string
  }
}>

export class RequestPasswordRecoverController {
  async handle(request: FastifyRequestWithBody, reply: FastifyReply) {
    const useCase = makeRequestPasswordRecoverUseCase()

    const { email } = request.body
    await useCase.execute({ email })

    return reply.status(201).send()
  }
}
