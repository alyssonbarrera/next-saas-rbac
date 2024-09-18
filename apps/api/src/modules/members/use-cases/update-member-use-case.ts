import type { Member, Organization } from '@prisma/client'

import { AppError } from '@/core/errors/app-error'
import { getUserPermissions } from '@/utils/get-user-permissions'

import type { UpdateMemberDTO } from '../dtos/update-member-dto'
import type { MembersRepository } from '../repositories/members-repository'

export type UpdateMemberUseCaseRequest = {
  data: UpdateMemberDTO
  userId: string
  memberId: string
  membership: Member
  organization: Organization
}

type UpdateMemberUseCaseResponse = {
  member: Member
}

export class UpdateMemberUseCase {
  constructor(private membersRepository: MembersRepository) {}

  async execute({
    userId,
    memberId,
    membership,
    organization,
    data: { role },
  }: UpdateMemberUseCaseRequest): Promise<UpdateMemberUseCaseResponse> {
    const { cannot } = getUserPermissions(userId, membership.role)

    if (cannot('update', 'User')) {
      throw new AppError('You are not allowed to update this member.', 403)
    }

    const member = await this.membersRepository.findMemberByIdAndOrganization(
      memberId,
      organization.id,
    )

    if (!member) {
      throw new AppError('Member not found.', 404)
    }

    const updatedMember = await this.membersRepository.update({
      id: memberId,
      organizationId: organization.id,
      data: {
        role,
      },
    })

    return { member: updatedMember }
  }
}
