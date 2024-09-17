import { PrismaTokensRepository } from '@/infra/database/prisma/repositories/prisma-tokens-repository'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'

import { RequestPasswordRecoverUseCase } from '../use-cases/request-password-recover-use-case'

export function makeRequestPasswordRecoverUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const tokensRepository = new PrismaTokensRepository()

  const useCase = new RequestPasswordRecoverUseCase(
    usersRepository,
    tokensRepository,
  )

  return useCase
}
