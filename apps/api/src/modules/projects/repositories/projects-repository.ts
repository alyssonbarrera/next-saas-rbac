import type { Prisma, Project } from '@prisma/client'

import type { CreateProjectDTO } from '../dtos/create-project-dto'

type FindBySlugAndOrganizationIdResponse = Project & {
  owner: {
    id: string
    name: string | null
    avatarUrl: string | null
  }
}

export abstract class ProjectsRepository {
  abstract save(project: CreateProjectDTO): Promise<Project>
  abstract findById(id: string): Promise<Project | null>
  abstract findByIdAndOrganizationId(
    id: string,
    organizationId: string,
  ): Promise<Project | null>

  abstract findBySlugAndOrganizationId(
    slug: string,
    organizationId: string,
  ): Promise<FindBySlugAndOrganizationIdResponse | null>

  abstract update(
    id: string,
    project: Prisma.ProjectUpdateInput,
  ): Promise<Project>

  abstract delete(id: string): Promise<void>
}
