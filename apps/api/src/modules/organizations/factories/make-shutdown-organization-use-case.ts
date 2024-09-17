import { PrismaOrganizationsRepository } from '@/infra/database/prisma/repositories/prisma-organizations-repository'

import { ShutdownOrganizationUseCase } from '../use-cases/shutdown-organization-use-case'

export function makeShutdownOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()

  const useCase = new ShutdownOrganizationUseCase(organizationsRepository)

  return useCase
}
