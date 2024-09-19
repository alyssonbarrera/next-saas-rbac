import { PrismaInvitesRepository } from '@/infra/database/prisma/repositories/prisma-invites-repository'

import { RevokeInviteUseCase } from '../use-cases/revoke-invite-use-case'

export function makeRevokeInviteUseCase() {
  const invitesRepository = new PrismaInvitesRepository()

  const useCase = new RevokeInviteUseCase(invitesRepository)

  return useCase
}
