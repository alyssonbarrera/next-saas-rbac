import type { Prisma, Project } from '@prisma/client'

import type { CreateProjectDTO } from '../dtos/create-project-dto'

export abstract class ProjectsRepository {
  abstract save(project: CreateProjectDTO): Promise<Project>
  abstract findById(id: string): Promise<Project | null>
  abstract findByIdAndOrganizationId(
    id: string,
    organizationId: string,
  ): Promise<Project | null>

  abstract update(
    id: string,
    project: Prisma.ProjectUpdateInput,
  ): Promise<Project>

  abstract delete(id: string): Promise<void>
}
