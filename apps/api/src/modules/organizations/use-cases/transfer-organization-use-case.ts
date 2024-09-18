import type { Member, Organization } from '@prisma/client'
import { organizationSchema } from '@saas/auth'

import { AppError } from '@/core/errors/app-error'
import type { MembersRepository } from '@/modules/members/repositories/members-repository'
import { getUserPermissions } from '@/utils/get-user-permissions'

import type { OrganizationsRepository } from '../repositories/organizations-repository'

type TransferOrganizationUseCaseRequest = {
  userId: string
  membership: Member
  transferToUserId: string
  organization: Organization
}

type TransferOrganizationUseCaseResponse = {
  organization: Organization
}

export class TransferOrganizationUseCase {
  constructor(
    private organizationsRepository: OrganizationsRepository,
    private membersRepository: MembersRepository,
  ) {}

  async execute({
    userId,
    membership,
    organization,
    transferToUserId,
  }: TransferOrganizationUseCaseRequest): Promise<TransferOrganizationUseCaseResponse> {
    const { cannot } = getUserPermissions(userId, membership.role)

    const authOrganization = organizationSchema.parse(organization)

    if (cannot('transfer_ownership', authOrganization)) {
      throw new AppError(
        'You are not allowed to transfer this organization ownership.',
        403,
      )
    }

    const transferToMembership =
      await this.membersRepository.findMemberByOrganizationAndUser(
        organization.id,
        transferToUserId,
      )

    if (!transferToMembership) {
      throw new AppError(
        'Target user is not a member of this organization.',
        403,
      )
    }

    const { organization: updatedOrganization } =
      await this.organizationsRepository.transferOwnership({
        newOwnerId: transferToUserId,
        organizationId: organization.id,
      })

    return {
      organization: updatedOrganization,
    }
  }
}
