import type { Member, Organization } from '@prisma/client'

import { AppError } from '@/core/errors/app-error'
import { getUserPermissions } from '@/utils/get-user-permissions'

import type {
  MembersRepository,
  MemberWithUser,
} from '../repositories/members-repository'

type GetMembersUseCaseRequest = {
  userId: string
  membership: Member
  organization: Organization
}

type GetMembersUseCaseResponse = {
  members: MemberWithUser[]
}

export class GetMembersUseCase {
  constructor(private membersRepository: MembersRepository) {}

  async execute({
    userId,
    membership,
    organization,
  }: GetMembersUseCaseRequest): Promise<GetMembersUseCaseResponse> {
    const { cannot } = getUserPermissions(userId, membership.role)

    if (cannot('get', 'User')) {
      throw new AppError(
        'You are not allowed to see organization members.',
        403,
      )
    }

    const members = await this.membersRepository.findAllByOrganizationId(
      organization.id,
    )

    return { members }
  }
}
