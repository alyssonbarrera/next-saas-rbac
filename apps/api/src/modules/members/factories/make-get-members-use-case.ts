import { PrismaMembersRepository } from '@/infra/database/prisma/repositories/prisma-members-repository'

import { GetMembersUseCase } from '../use-cases/get-members-use-case'

export function makeGetMembersUseCase() {
  const membersRepository = new PrismaMembersRepository()

  const useCase = new GetMembersUseCase(membersRepository)

  return useCase
}
