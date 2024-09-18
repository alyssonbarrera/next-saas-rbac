import { PrismaProjectsRepository } from '@/infra/database/prisma/repositories/prisma-projects-repository'

import { UpdateProjectUseCase } from '../use-cases/update-project-use-case'

export function makeUpdateProjectUseCase() {
  const projectsRepository = new PrismaProjectsRepository()

  const useCase = new UpdateProjectUseCase(projectsRepository)

  return useCase
}
