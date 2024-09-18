import { PrismaProjectsRepository } from '@/infra/database/prisma/repositories/prisma-projects-repository'

import { DeleteProjectUseCase } from '../use-cases/delete-project-use-case'

export function makeDeleteProjectUseCase() {
  const projectsRepository = new PrismaProjectsRepository()

  const useCase = new DeleteProjectUseCase(projectsRepository)

  return useCase
}
