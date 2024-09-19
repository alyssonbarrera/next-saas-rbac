import { Invite } from '@prisma/client'

import { CreateInviteDTO } from '../dtos/create-invite-dto'

export abstract class InvitesRepository {
  abstract save(invite: CreateInviteDTO): Promise<Invite>
  abstract findById(id: string): Promise<Invite | null>
  abstract findByEmail(email: string): Promise<Invite | null>
  abstract findByEmailAndOrganization(
    email: string,
    organizationId: string,
  ): Promise<Invite | null>

  abstract delete(id: string): Promise<void>
  abstract deleteByEmailAndOrganization(
    email: string,
    organizationId: string,
  ): Promise<void>
}
