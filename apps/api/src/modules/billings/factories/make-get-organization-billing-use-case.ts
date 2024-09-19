import { PrismaMembersRepository } from '@/infra/database/prisma/repositories/prisma-members-repository'
import { PrismaProjectsRepository } from '@/infra/database/prisma/repositories/prisma-projects-repository'

import { GetOrganizationBillingUseCase } from '../use-cases/get-organization-billing-use-case'

export function makeGetOrganizationBillingUseCase() {
  const membersRepository = new PrismaMembersRepository()
  const projectsRepository = new PrismaProjectsRepository()

  const useCase = new GetOrganizationBillingUseCase(
    membersRepository,
    projectsRepository,
  )

  return useCase
}
