import { PrismaProjectsRepository } from '@/infra/database/prisma/repositories/prisma-projects-repository'

import { CreateProjectUseCase } from '../use-cases/create-project-use-case'

export function makeCreateProjectUseCase() {
  const projectsRepository = new PrismaProjectsRepository()

  const useCase = new CreateProjectUseCase(projectsRepository)

  return useCase
}
