import type { Member, Organization } from '@prisma/client'
import { organizationSchema } from '@saas/auth'

import { AppError } from '@/core/errors/app-error'
import { getUserPermissions } from '@/utils/get-user-permissions'

import type { UpdateOrganizationDTO } from '../dtos/update-organization-dto'
import type { OrganizationsRepository } from '../repositories/organizations-repository'

export type UpdateOrganizationUseCaseRequest = {
  data: UpdateOrganizationDTO
  userId: string
  membership: Member
  organization: Organization
}

type UpdateOrganizationUseCaseResponse = {
  organization: Organization
}

export class UpdateOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    userId,
    membership,
    organization,
    data: { name, domain, avatarUrl, shouldAttachUsersByDomain },
  }: UpdateOrganizationUseCaseRequest): Promise<UpdateOrganizationUseCaseResponse> {
    const { cannot } = getUserPermissions(userId, membership.role)

    const authOrganization = organizationSchema.parse(organization)

    if (cannot('update', authOrganization)) {
      throw new AppError(
        'You are not allowed to update this organization.',
        403,
      )
    }

    if (domain) {
      const organizationByDomain =
        await this.organizationsRepository.findByDomainExcludingId(
          domain,
          organization.id,
        )

      if (organizationByDomain) {
        throw new AppError(
          'Another organization with same domain already exists',
          409,
        )
      }
    }

    const updatedOrganization = await this.organizationsRepository.update(
      organization.id,
      {
        name,
        domain,
        avatarUrl,
        shouldAttachUsersByDomain,
      },
    )

    return { organization: updatedOrganization }
  }
}
