import { PrismaOrganizationsRepository } from '@/infra/database/prisma/repositories/prisma-organizations-repository'

import { GetOrganizationsUseCase } from '../use-cases/get-organizations-use-case'

export function makeGetOrganizationsUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()

  const useCase = new GetOrganizationsUseCase(organizationsRepository)

  return useCase
}
