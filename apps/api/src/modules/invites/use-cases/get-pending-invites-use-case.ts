import { AppError } from '@/core/errors/app-error'
import { UsersRepository } from '@/modules/users/repositories/users-repository'

import type {
  InvitesRepository,
  InviteWithAuthor,
} from '../repositories/invites-repository'

export type GetPendingInvitesUseCaseRequest = {
  userId: string
}

type GetPendingInvitesUseCaseResponse = {
  invites: InviteWithAuthor[]
}

export class GetPendingInvitesUseCase {
  constructor(
    private invitesRepository: InvitesRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    userId,
  }: GetPendingInvitesUseCaseRequest): Promise<GetPendingInvitesUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new AppError('User not found.', 404)
    }

    const invites = await this.invitesRepository.findAllByUser(user.email)

    return { invites }
  }
}
