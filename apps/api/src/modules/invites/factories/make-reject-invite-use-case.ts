import { PrismaInvitesRepository } from '@/infra/database/prisma/repositories/prisma-invites-repository'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'

import { RejectInviteUseCase } from '../use-cases/reject-invite-use-case'

export function makeRejectInviteUseCase() {
  const invitesRepository = new PrismaInvitesRepository()
  const usersRepository = new PrismaUsersRepository()

  const useCase = new RejectInviteUseCase(invitesRepository, usersRepository)

  return useCase
}
