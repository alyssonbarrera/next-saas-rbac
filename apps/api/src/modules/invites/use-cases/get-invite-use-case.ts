import { AppError } from '@/core/errors/app-error'

import type {
  InvitesRepository,
  InviteWithAuthorAndOrganization,
} from '../repositories/invites-repository'

export type GetInviteUseCaseRequest = {
  id: string
}

type GetInviteUseCaseResponse = {
  invite: InviteWithAuthorAndOrganization
}

export class GetInviteUseCase {
  constructor(private invitesRepository: InvitesRepository) {}

  async execute({
    id,
  }: GetInviteUseCaseRequest): Promise<GetInviteUseCaseResponse> {
    const invite = await this.invitesRepository.findById(id)

    if (!invite) {
      throw new AppError('Invite not found.', 404)
    }

    return { invite }
  }
}
