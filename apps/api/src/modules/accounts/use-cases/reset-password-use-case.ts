import { hash } from 'bcryptjs'

import { AppError } from '@/core/errors/app-error'
import type { UsersRepository } from '@/modules/users/repositories/users-repository'

import type { TokensRepository } from '../repositories/tokens-repository'

type ResetPasswordUseCaseRequest = {
  code: string
  password: string
}

type ResetPasswordUseCaseResponse = void

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

    await this.usersRepository.updatePasswordAndDeleteToken({
      userId: tokenFromCode.userId,
      tokenId: tokenFromCode.id,
      password: passwordHash,
    })
  }
}
