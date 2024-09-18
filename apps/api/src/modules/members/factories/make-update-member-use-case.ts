import { PrismaMembersRepository } from '@/infra/database/prisma/repositories/prisma-members-repository'

import { UpdateMemberUseCase } from '../use-cases/update-member-use-case'

export function makeUpdateMemberUseCase() {
  const membersRepository = new PrismaMembersRepository()

  const useCase = new UpdateMemberUseCase(membersRepository)

  return useCase
}
