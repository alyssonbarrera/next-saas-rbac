import type { Member, Organization } from '@prisma/client'

import { AppError } from '@/core/errors/app-error'
import { getUserPermissions } from '@/utils/get-user-permissions'

import type {
  InvitesRepository,
  InviteWithAuthor,
} from '../repositories/invites-repository'

export type GetInvitesUseCaseRequest = {
  userId: string
  membership: Member
  organization: Organization
}

type GetInvitesUseCaseResponse = {
  invites: InviteWithAuthor[]
}

export class GetInvitesUseCase {
  constructor(private invitesRepository: InvitesRepository) {}

  async execute({
    userId,
    membership,
    organization,
  }: GetInvitesUseCaseRequest): Promise<GetInvitesUseCaseResponse> {
    const { cannot } = getUserPermissions(userId, membership.role)

    if (cannot('get', 'Invite')) {
      throw new AppError(
        'You are not allowed to get organization invites.',
        403,
      )
    }

    const invites = await this.invitesRepository.findAllByOrganization(
      organization.id,
    )

    return { invites }
  }
}
