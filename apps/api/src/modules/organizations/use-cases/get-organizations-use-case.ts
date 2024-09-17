import type { $Enums } from '@prisma/client'

import { OrganizationsRepository } from '../repositories/organizations-repository'

type GetOrganizationsUseCaseRequest = {
  userId: string
}

type GetOrganizationsUseCaseResponse = {
  organizations: {
    id: string
    name: string
    slug: string
    role: $Enums.Role
    domain: string | null
    avatarUrl: string | null
  }[]
}

export class GetOrganizationsUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    userId,
  }: GetOrganizationsUseCaseRequest): Promise<GetOrganizationsUseCaseResponse> {
    const organizations =
      await this.organizationsRepository.getAllWhereUserIsMember(userId)

    const organizationWithUserRole = organizations.map(
      ({ members, ...org }) => {
        return {
          ...org,
          role: members[0].role,
        }
      },
    )

    return {
      organizations: organizationWithUserRole,
    }
  }
}
