import { PrismaAccountsRepository } from '@/infra/database/prisma/repositories/prisma-accounts-repository'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'

import { AuthenticateWithGithubUseCase } from '../use-cases/authenticate-with-github-use-case'

export function makeAuthenticateWithGithubUseCase() {
  const accountsRepository = new PrismaAccountsRepository()
  const usersRepository = new PrismaUsersRepository()

  const useCase = new AuthenticateWithGithubUseCase(
    accountsRepository,
    usersRepository,
  )

  return useCase
}
