import type { Invite } from '@prisma/client'
import type { Role } from '@saas/auth'

import type { CreateInviteDTO } from '../dtos/create-invite-dto'

export type InviteWithAuthorAndOrganization = {
  id: string
  email: string
  role: Role
  createdAt: Date
  author: {
    id: string
    name: string | null
    avatarUrl: string | null
  } | null
  organization: {
    id: string
    name: string
    avatarUrl: string | null
  }
}

export abstract class InvitesRepository {
  abstract save(invite: CreateInviteDTO): Promise<Invite>
  abstract findById(id: string): Promise<InviteWithAuthorAndOrganization | null>

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
