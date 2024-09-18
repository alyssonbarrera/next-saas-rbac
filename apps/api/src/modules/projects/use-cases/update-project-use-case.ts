import type { Member, Organization, Project } from '@prisma/client'
import { projectSchema } from '@saas/auth'

import { AppError } from '@/core/errors/app-error'
import { getUserPermissions } from '@/utils/get-user-permissions'

import type { UpdateProjectDTO } from '../dtos/update-project-dto'
import type { ProjectsRepository } from '../repositories/projects-repository'

export type UpdateProjectUseCaseRequest = {
  data: UpdateProjectDTO
  slug: string
  userId: string
  membership: Member
  organization: Organization
}

type UpdateProjectUseCaseResponse = {
  project: Project
}

export class UpdateProjectUseCase {
  constructor(private projectsRepository: ProjectsRepository) {}

  async execute({
    slug,
    userId,
    membership,
    organization,
    data: { name, avatarUrl, description },
  }: UpdateProjectUseCaseRequest): Promise<UpdateProjectUseCaseResponse> {
    const { cannot } = getUserPermissions(userId, membership.role)

    const project = await this.projectsRepository.findBySlugAndOrganizationId(
      slug,
      organization.id,
    )

    if (!project) {
      throw new AppError('Project not found.', 404)
    }

    const authProject = projectSchema.parse({
      id: project.id,
      ownerId: project.ownerId,
    })

    if (cannot('update', authProject)) {
      throw new AppError('You are not allowed to update this project.', 403)
    }

    const updatedProject = await this.projectsRepository.update(project.id, {
      name,
      avatarUrl,
      description,
    })

    return { project: updatedProject }
  }
}
