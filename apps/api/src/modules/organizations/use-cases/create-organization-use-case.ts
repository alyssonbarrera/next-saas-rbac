import type { Organization } from '@prisma/client'

import { AppError } from '@/core/errors/app-error'
import { Slug } from '@/utils/slug'

import type { OrganizationsRepository } from '../repositories/organizations-repository'

export type CreateOrganizationUseCaseRequest = {
  name: string
  userId: string
  domain?: string | null
  avatarUrl?: string | null
  shouldAttachUsersByDomain?: boolean
}

type CreateOrganizationUseCaseResponse = {
  organization: Organization
}

export class CreateOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    name,
    domain,
    userId,
    avatarUrl,
    shouldAttachUsersByDomain,
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
    if (domain) {
      const organizationByDomain =
        await this.organizationsRepository.findByDomain(domain)

      if (organizationByDomain) {
        throw new AppError(
          'Another organization with same domain already exists',
          409,
        )
      }
    }

    const slug = Slug.createFromText(name)

    const organization = await this.organizationsRepository.save({
      name,
      domain,
      avatarUrl,
      ownerId: userId,
      slug: slug.value,
      shouldAttachUsersByDomain,
    })

    return { organization }
  }
}
