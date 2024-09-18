import { PrismaProjectsRepository } from '@/infra/database/prisma/repositories/prisma-projects-repository'

import { GetProjectsUseCase } from '../use-cases/get-projects-use-case'

export function makeGetProjectsUseCase() {
  const projectsRepository = new PrismaProjectsRepository()

  const useCase = new GetProjectsUseCase(projectsRepository)

  return useCase
}
