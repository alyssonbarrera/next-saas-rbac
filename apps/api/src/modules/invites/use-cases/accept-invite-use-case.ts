import { AppError } from '@/core/errors/app-error'
import { MembersRepository } from '@/modules/members/repositories/members-repository'
import { UsersRepository } from '@/modules/users/repositories/users-repository'

import type { InvitesRepository } from '../repositories/invites-repository'

export type AcceptInviteUseCaseRequest = {
  id: string
  userId: string
}

type AcceptInviteUseCaseResponse = void

export class AcceptInviteUseCase {
  constructor(
    private invitesRepository: InvitesRepository,
    private usersRepository: UsersRepository,
    private membersRepository: MembersRepository,
  ) {}

  async execute({
    id,
    userId,
  }: AcceptInviteUseCaseRequest): Promise<AcceptInviteUseCaseResponse> {
    const invite = await this.invitesRepository.findById(id)

    if (!invite) {
      throw new AppError('Invite not found or expired.', 404)
    }

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new AppError('User not found.', 404)
    }

    if (invite.email !== user.email) {
      throw new AppError('This invite belongs to another user.', 403)
    }

    await this.membersRepository.saveAndDeleteInvite(
      {
        userId: user.id,
        organizationId: invite.organization.id,
        role: invite.role,
      },
      invite.id,
    )
  }
}
