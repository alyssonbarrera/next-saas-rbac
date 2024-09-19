import { PrismaInvitesRepository } from '@/infra/database/prisma/repositories/prisma-invites-repository'
import { PrismaMembersRepository } from '@/infra/database/prisma/repositories/prisma-members-repository'

import { CreateInviteUseCase } from '../use-cases/create-invite-use-case'

export function makeCreateInviteUseCase() {
  const invitesRepository = new PrismaInvitesRepository()
  const membersRepository = new PrismaMembersRepository()

  const useCase = new CreateInviteUseCase(invitesRepository, membersRepository)

  return useCase
}
