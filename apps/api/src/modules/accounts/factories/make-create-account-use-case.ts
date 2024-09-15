import { PrismaAccountsRepository } from '@/infra/database/prisma/repositories/prisma-accounts-repository'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'

import { CreateAccountUseCase } from '../use-cases/create-account-use-case'

export function makeCreateAccountUseCase() {
  const accountsRepository = new PrismaAccountsRepository()
  const usersRepository = new PrismaUsersRepository()
  const useCase = new CreateAccountUseCase(accountsRepository, usersRepository)

  return useCase
}
