import type { Member, Organization, Prisma } from '@prisma/client'
import { Role } from '@saas/auth'

import type { FindByUserIdAndOrganizationSlugDTO } from '../dtos/find-by-user-id-and-organization-slug-dto'
import type { UpdateRoleByOrganizationAndUserDTO } from '../dtos/update-role-by-organization-and-user-dto'

export type FindByUserIdAndOrganizationSlugResponse = Member & {
  organization: Organization
}

export type MemberWithUser = {
  id: string
  role: Role
  user: {
    id: string
    email: string
    name: string | null
    avatarUrl: string | null
  }
}

export abstract class MembersRepository {
  abstract save(member: Prisma.MemberCreateInput): Promise<Member>
  abstract findByUserIdAndOrganizationSlug(
    params: FindByUserIdAndOrganizationSlugDTO,
  ): Promise<FindByUserIdAndOrganizationSlugResponse | null>

  abstract findMemberByOrganizationAndUser(
    organizationId: string,
    userId: string,
  ): Promise<Member | null>

  abstract findAllByOrganizationId(
    organizationId: string,
  ): Promise<MemberWithUser[]>

  abstract updateRoleByOrganizationAndUser(
    data: UpdateRoleByOrganizationAndUserDTO,
  ): Promise<Member>

  abstract delete(id: string): Promise<void>
}
