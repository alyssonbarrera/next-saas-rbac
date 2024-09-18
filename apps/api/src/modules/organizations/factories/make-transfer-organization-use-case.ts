import { PrismaMembersRepository } from '@/infra/database/prisma/repositories/prisma-members-repository'
import { PrismaOrganizationsRepository } from '@/infra/database/prisma/repositories/prisma-organizations-repository'

import { TransferOrganizationUseCase } from '../use-cases/transfer-organization-use-case'

export function makeTransferOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const membersRepository = new PrismaMembersRepository()

  const useCase = new TransferOrganizationUseCase(
    organizationsRepository,
    membersRepository,
  )

  return useCase
}
