import { PrismaOrganizationsRepository } from '@/infra/database/prisma/repositories/prisma-organizations-repository'

import { UpdateOrganizationUseCase } from '../use-cases/update-organization-use-case'

export function makeUpdateOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()

  const useCase = new UpdateOrganizationUseCase(organizationsRepository)

  return useCase
}
