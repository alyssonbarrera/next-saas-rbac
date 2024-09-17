import { PrismaOrganizationsRepository } from '@/infra/database/prisma/repositories/prisma-organizations-repository'

import { CreateOrganizationUseCase } from '../use-cases/create-organization-use-case'

export function makeCreateOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()

  const useCase = new CreateOrganizationUseCase(organizationsRepository)

  return useCase
}
