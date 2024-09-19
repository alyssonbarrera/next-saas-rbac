import { PrismaInvitesRepository } from '@/infra/database/prisma/repositories/prisma-invites-repository'

import { GetInviteUseCase } from '../use-cases/get-invite-use-case'

export function makeGetInviteUseCase() {
  const invitesRepository = new PrismaInvitesRepository()

  const useCase = new GetInviteUseCase(invitesRepository)

  return useCase
}
