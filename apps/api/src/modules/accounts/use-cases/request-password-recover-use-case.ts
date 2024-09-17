import type { UsersRepository } from '@/modules/users/repositories/users-repository'

import type { TokensRepository } from '../repositories/tokens-repository'

type RequestPasswordRecoverUseCaseRequest = {
  email: string
}

type RequestPasswordRecoverUseCaseResponse = null

export class RequestPasswordRecoverUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private tokensRepository: TokensRepository,
  ) {}

  async execute({
    email,
  }: RequestPasswordRecoverUseCaseRequest): Promise<RequestPasswordRecoverUseCaseResponse> {
    const userFromEmail = await this.usersRepository.findByEmail(email)

    if (!userFromEmail) {
      return null
    }

    const { id: code } = await this.tokensRepository.save({
      type: 'PASSWORD_RECOVER',
      userId: userFromEmail.id,
    })

    console.log(`Password recover code: ${code}`)

    return null
  }
}
