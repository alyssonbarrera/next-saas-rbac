import { hash } from 'bcryptjs'

import { AppError } from '@/core/errors/app-error'
import type { UsersRepository } from '@/modules/users/repositories/users-repository'

import type { TokensRepository } from '../repositories/tokens-repository'

type ResetPasswordUseCaseRequest = {
  code: string
  password: string
}

type ResetPasswordUseCaseResponse = null

export class ResetPasswordUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private tokensRepository: TokensRepository,
  ) {}

  async execute({
    code,
    password,
  }: ResetPasswordUseCaseRequest): Promise<ResetPasswordUseCaseResponse> {
    const tokenFromCode = await this.tokensRepository.findById(code)

    if (!tokenFromCode) {
      throw new AppError('Unauthorized.', 401)
    }

    const passwordHash = await hash(password, 14)

    await this.usersRepository.updatePassword({
      id: tokenFromCode.userId,
      password: passwordHash,
    })

    await this.tokensRepository.delete(tokenFromCode.id)

    return null
  }
}
