import { PrismaMembersRepository } from '@/infra/database/prisma/repositories/prisma-members-repository'

import { RemoveMemberUseCase } from '../use-cases/remove-member-use-case'

export function makeRemoveMemberUseCase() {
  const membersRepository = new PrismaMembersRepository()

  const useCase = new RemoveMemberUseCase(membersRepository)

  return useCase
}
