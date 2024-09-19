import { PrismaInvitesRepository } from '@/infra/database/prisma/repositories/prisma-invites-repository'
import { PrismaMembersRepository } from '@/infra/database/prisma/repositories/prisma-members-repository'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'

import { AcceptInviteUseCase } from '../use-cases/accept-invite-use-case'

export function makeAcceptInviteUseCase() {
  const invitesRepository = new PrismaInvitesRepository()
  const usersRepository = new PrismaUsersRepository()
  const membersRepository = new PrismaMembersRepository()

  const useCase = new AcceptInviteUseCase(
    invitesRepository,
    usersRepository,
    membersRepository,
  )

  return useCase
}
