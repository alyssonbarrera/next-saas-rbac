import type { Member, Organization } from '@prisma/client'

import { AppError } from '@/core/errors/app-error'
import { getUserPermissions } from '@/utils/get-user-permissions'

import type { MembersRepository } from '../repositories/members-repository'

type RemoveMemberUseCaseRequest = {
  userId: string
  memberId: string
  membership: Member
  organization: Organization
}

type RemoveMemberUseCaseResponse = void

export class RemoveMemberUseCase {
  constructor(private membersRepository: MembersRepository) {}

  async execute({
    userId,
    memberId,
    membership,
    organization,
  }: RemoveMemberUseCaseRequest): Promise<RemoveMemberUseCaseResponse> {
    const member = await this.membersRepository.findMemberByIdAndOrganization(
      memberId,
      organization.id,
    )

    if (!member) {
      throw new AppError('Member not found.', 404)
    }

    const { cannot } = getUserPermissions(userId, membership.role)

    if (cannot('delete', 'User')) {
      throw new AppError(
        'You are not allowed to remove this member from the organization.',
        403,
      )
    }

    await this.membersRepository.deleteByOrganization(memberId, organization.id)
  }
}
