import type { Member, Organization, Project } from '@prisma/client'

import { AppError } from '@/core/errors/app-error'
import { getUserPermissions } from '@/utils/get-user-permissions'

import type { ProjectsRepository } from '../repositories/projects-repository'

type GetProjectUseCaseRequest = {
  slug: string
  userId: string
  membership: Member
  organization: Organization
}

type GetProjectUseCaseResponse = {
  project: Project & {
    owner: {
      id: string
      name: string | null
      avatarUrl: string | null
    }
  }
}

export class GetProjectUseCase {
  constructor(private projectsRepository: ProjectsRepository) {}

  async execute({
    slug,
    userId,
    membership,
    organization,
  }: GetProjectUseCaseRequest): Promise<GetProjectUseCaseResponse> {
    const { cannot } = getUserPermissions(userId, membership.role)

    if (cannot('get', 'Project')) {
      throw new AppError('You are not allowed to see this project.', 403)
    }

    const project = await this.projectsRepository.findBySlugAndOrganizationId(
      slug,
      organization.id,
    )

    if (!project) {
      throw new AppError('Project not found.', 404)
    }

    return { project }
  }
}
