import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeAuthenticateWithPasswordUseCase } from '@/modules/accounts/factories/make-authenticate-with-password-use-case'

type FastifyRequestWithBody = FastifyRequest<{
  Body: {
    email: string
    password: string
  }
}>

export class AuthenticateWithPasswordController {
  async handle(request: FastifyRequestWithBody, reply: FastifyReply) {
    const useCase = makeAuthenticateWithPasswordUseCase()

    const { email, password } = request.body
    const result = await useCase.execute({ email, password })

    const token = await reply.jwtSign(
      {
        sub: result.user.id,
      },
      {
        sign: {
          expiresIn: '7d',
        },
      },
    )

    return reply.status(201).send({
      user: result.user,
      token,
    })
  }
}
