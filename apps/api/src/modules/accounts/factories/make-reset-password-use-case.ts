import { PrismaTokensRepository } from '@/infra/database/prisma/repositories/prisma-tokens-repository'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'

import { ResetPasswordUseCase } from '../use-cases/reset-password-use-case'

export function makeResetPasswordUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const tokensRepository = new PrismaTokensRepository()

  const useCase = new ResetPasswordUseCase(usersRepository, tokensRepository)

  return useCase
}
