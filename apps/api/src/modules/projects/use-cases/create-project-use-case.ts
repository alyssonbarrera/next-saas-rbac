import type { Member, Organization, Project } from '@prisma/client'

import { AppError } from '@/core/errors/app-error'
import { getUserPermissions } from '@/utils/get-user-permissions'
import { Slug } from '@/utils/slug'

import type { ProjectsRepository } from '../repositories/projects-repository'

export type CreateProjectUseCaseRequest = {
  name: string
  description: string
  avatarUrl?: string | null

  userId: string
  membership: Member
  organization: Organization
}

type CreateProjectUseCaseResponse = {
  project: Project
}

export class CreateProjectUseCase {
  constructor(private projectsRepository: ProjectsRepository) {}

  async execute({
    name,
    avatarUrl,
    description,
    userId,
    membership,
    organization,
  }: CreateProjectUseCaseRequest): Promise<CreateProjectUseCaseResponse> {
    const { cannot } = getUserPermissions(userId, membership.role)

    if (cannot('create', 'Project')) {
      throw new AppError('You are not allowed to create a new project.', 403)
    }

    const slug = Slug.createFromText(name)

    const project = await this.projectsRepository.save({
      name,
      avatarUrl,
      description,
      slug: slug.value,
      ownerId: userId,
      organizationId: organization.id,
    })

    return { project }
  }
}
