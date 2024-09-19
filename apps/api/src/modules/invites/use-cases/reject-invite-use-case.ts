import { AppError } from '@/core/errors/app-error'
import { UsersRepository } from '@/modules/users/repositories/users-repository'

import type { InvitesRepository } from '../repositories/invites-repository'

export type RejectInviteUseCaseRequest = {
  id: string
  userId: string
}

type RejectInviteUseCaseResponse = void

export class RejectInviteUseCase {
  constructor(
    private invitesRepository: InvitesRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    id,
    userId,
  }: RejectInviteUseCaseRequest): Promise<RejectInviteUseCaseResponse> {
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

    await this.invitesRepository.delete(id)
  }
}
