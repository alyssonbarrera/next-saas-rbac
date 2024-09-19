import { PrismaInvitesRepository } from '@/infra/database/prisma/repositories/prisma-invites-repository'

import { GetInvitesUseCase } from '../use-cases/get-invites-use-case'

export function makeGetInvitesUseCase() {
  const invitesRepository = new PrismaInvitesRepository()

  const useCase = new GetInvitesUseCase(invitesRepository)

  return useCase
}
