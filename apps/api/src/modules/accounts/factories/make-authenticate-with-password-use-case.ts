import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'

import { AuthenticateWithPasswordUseCase } from '../use-cases/authenticate-with-password-use-case'

export function makeAuthenticateWithPasswordUseCase() {
  const usersRepository = new PrismaUsersRepository()

  const useCase = new AuthenticateWithPasswordUseCase(usersRepository)

  return useCase
}
