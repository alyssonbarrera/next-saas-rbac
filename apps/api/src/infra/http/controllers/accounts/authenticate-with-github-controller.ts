import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeAuthenticateWithGithubUseCase } from '@/modules/accounts/factories/make-authenticate-with-github-use-case'

type FastifyRequestWithBody = FastifyRequest<{
  Body: {
    code: string
  }
}>

export class AuthenticateWithGithubController {
  async handle(request: FastifyRequestWithBody, reply: FastifyReply) {
    const useCase = makeAuthenticateWithGithubUseCase()

    const { code } = request.body
    const result = await useCase.execute({ code })

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
