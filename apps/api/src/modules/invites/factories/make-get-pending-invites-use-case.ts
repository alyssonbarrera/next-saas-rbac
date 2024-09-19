import { PrismaInvitesRepository } from '@/infra/database/prisma/repositories/prisma-invites-repository'
import { PrismaUsersRepository } from '@/infra/database/prisma/repositories/prisma-users-repository'

import { GetPendingInvitesUseCase } from '../use-cases/get-pending-invites-use-case'

export function makeGetPendingInvitesUseCase() {
  const invitesRepository = new PrismaInvitesRepository()
  const usersRepository = new PrismaUsersRepository()

  const useCase = new GetPendingInvitesUseCase(
    invitesRepository,
    usersRepository,
  )

  return useCase
}
