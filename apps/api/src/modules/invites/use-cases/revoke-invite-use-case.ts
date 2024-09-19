import type { Member, Organization } from '@prisma/client'

import { AppError } from '@/core/errors/app-error'
import { getUserPermissions } from '@/utils/get-user-permissions'

import type { InvitesRepository } from '../repositories/invites-repository'

export type RevokeInviteUseCaseRequest = {
  id: string
  userId: string
  membership: Member
  organization: Organization
}

type RevokeInviteUseCaseResponse = void

export class RevokeInviteUseCase {
  constructor(private invitesRepository: InvitesRepository) {}

  async execute({
    id,
    userId,
    membership,
    organization,
  }: RevokeInviteUseCaseRequest): Promise<RevokeInviteUseCaseResponse> {
    const { cannot } = getUserPermissions(userId, membership.role)

    if (cannot('delete', 'Invite')) {
      throw new AppError('You are not allowed to revoke an invite.', 403)
    }

    const invite = await this.invitesRepository.findById(id)

    if (!invite) {
      throw new AppError('Invite not found.', 404)
    }

    await this.invitesRepository.deleteByIdAndOrganization(id, organization.id)
  }
}
