import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeResetPasswordUseCase } from '@/modules/accounts/factories/make-reset-password-use-case'

type FastifyRequestWithBody = FastifyRequest<{
  Body: {
    code: string
    password: string
  }
}>

export class ResetPasswordController {
  async handle(request: FastifyRequestWithBody, reply: FastifyReply) {
    const useCase = makeResetPasswordUseCase()

    const { code, password } = request.body
    await useCase.execute({ code, password })

    return reply.status(204).send()
  }
}
