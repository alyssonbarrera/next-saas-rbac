import { Member, Organization } from '@prisma/client'

import { AppError } from '@/core/errors/app-error'
import type { MembersRepository } from '@/modules/members/repositories/members-repository'

export type GetMembershipUseCaseRequest = {
  userId: string
  organizationSlug: string
}

type GetMembershipUseCaseResponse = {
  membership: Member
  organization: Organization
}

export class GetMembershipUseCase {
  constructor(private membersRepository: MembersRepository) {}

  async execute({
    userId,
    organizationSlug,
  }: GetMembershipUseCaseRequest): Promise<GetMembershipUseCaseResponse> {
    const member = await this.membersRepository.findByUserIdAndOrganizationSlug(
      {
        userId,
        organizationSlug,
      },
    )

    if (!member) {
      throw new AppError('You are not a member of this organization.', 403)
    }

    const { organization, ...membership } = member

    return {
      membership,
      organization,
    }
  }
}
