import type { Member, Organization } from '@prisma/client'
import { organizationSchema } from '@saas/auth'

import { AppError } from '@/core/errors/app-error'
import { getUserPermissions } from '@/utils/get-user-permissions'

import type { OrganizationsRepository } from '../repositories/organizations-repository'

type ShutdownOrganizationUseCaseRequest = {
  userId: string
  membership: Member
  organization: Organization
}

export class ShutdownOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    userId,
    membership,
    organization,
  }: ShutdownOrganizationUseCaseRequest): Promise<void> {
    const { cannot } = getUserPermissions(userId, membership.role)

    const authOrganization = organizationSchema.parse(organization)

    if (cannot('delete', authOrganization)) {
      throw new AppError(
        'You are not allowed to shutdown this organization.',
        403,
      )
    }

    await this.organizationsRepository.delete(organization.id)
  }
}
