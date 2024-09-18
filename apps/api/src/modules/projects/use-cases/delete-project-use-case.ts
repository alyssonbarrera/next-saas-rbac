import type { Member, Organization } from '@prisma/client'
import { projectSchema } from '@saas/auth'

import { AppError } from '@/core/errors/app-error'
import { getUserPermissions } from '@/utils/get-user-permissions'

import type { ProjectsRepository } from '../repositories/projects-repository'

type DeleteProjectUseCaseRequest = {
  id: string
  userId: string
  membership: Member
  organization: Organization
}

type DeleteProjectUseCaseResponse = void

export class DeleteProjectUseCase {
  constructor(private projectsRepository: ProjectsRepository) {}

  async execute({
    id,
    userId,
    membership,
    organization,
  }: DeleteProjectUseCaseRequest): Promise<DeleteProjectUseCaseResponse> {
    const project = await this.projectsRepository.findByIdAndOrganizationId(
      id,
      organization.id,
    )

    if (!project) {
      throw new AppError('Project not found.', 404)
    }

    const { cannot } = getUserPermissions(userId, membership.role)

    const authProject = projectSchema.parse({
      id,
      ownerId: project.ownerId,
    })

    if (cannot('delete', authProject)) {
      throw new AppError('You are not allowed to delete this project.', 403)
    }

    await this.projectsRepository.delete(project.id)
  }
}
