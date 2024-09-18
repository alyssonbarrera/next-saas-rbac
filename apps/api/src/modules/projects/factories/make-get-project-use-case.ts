import { PrismaProjectsRepository } from '@/infra/database/prisma/repositories/prisma-projects-repository'

import { GetProjectUseCase } from '../use-cases/get-project-use-case'

export function makeGetProjectUseCase() {
  const projectsRepository = new PrismaProjectsRepository()

  const useCase = new GetProjectUseCase(projectsRepository)

  return useCase
}
