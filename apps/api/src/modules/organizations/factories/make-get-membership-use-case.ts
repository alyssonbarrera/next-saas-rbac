import { PrismaMembersRepository } from '@/infra/database/prisma/repositories/prisma-members-repository'

import { GetMembershipUseCase } from '../use-cases/get-membership-use-case'

export function makeGetMembershipUseCase() {
  const membersRepository = new PrismaMembersRepository()

  const useCase = new GetMembershipUseCase(membersRepository)

  return useCase
}
