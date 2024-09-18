import type { Member, Organization } from '@prisma/client'

import { AppError } from '@/core/errors/app-error'
import { getUserPermissions } from '@/utils/get-user-permissions'

import type {
  ProjectsRepository,
  ProjectWithOwner,
} from '../repositories/projects-repository'

type GetProjectsUseCaseRequest = {
  userId: string
  membership: Member
  organization: Organization
}

type GetProjectsUseCaseResponse = {
  projects: ProjectWithOwner[]
}

export class GetProjectsUseCase {
  constructor(private projectsRepository: ProjectsRepository) {}

  async execute({
    userId,
    membership,
    organization,
  }: GetProjectsUseCaseRequest): Promise<GetProjectsUseCaseResponse> {
    const { cannot } = getUserPermissions(userId, membership.role)

    if (cannot('get', 'Project')) {
      throw new AppError(
        'You are not allowed to see organization projects.',
        403,
      )
    }

    const projects = await this.projectsRepository.findAllByOrganizationId(
      organization.id,
    )

    return { projects }
  }
}
