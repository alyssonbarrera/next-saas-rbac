import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'

import { GetProfileUseCase } from '../use-cases/get-profile-use-case'

export function makeGetProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()

  const useCase = new GetProfileUseCase(usersRepository)

  return useCase
}
