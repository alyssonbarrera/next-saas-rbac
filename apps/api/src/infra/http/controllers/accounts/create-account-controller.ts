import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeCreateAccountUseCase } from '@/modules/accounts/factories/make-create-account-use-case'

type FastifyRequestWithBody = FastifyRequest<{
  Body: {
    name: string
    email: string
    password: string
  }
}>

export class CreateAccountController {
  async handle(request: FastifyRequestWithBody, reply: FastifyReply) {
    const useCase = makeCreateAccountUseCase()

    const { name, email, password } = request.body
    const result = await useCase.execute({ name, email, password })

    return reply.status(201).send(result)
  }
}
