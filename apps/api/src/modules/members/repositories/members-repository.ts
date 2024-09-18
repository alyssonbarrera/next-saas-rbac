import type { Member, Organization, Prisma } from '@prisma/client'

import type { FindByUserIdAndOrganizationSlugDTO } from '../dtos/find-by-user-id-and-organization-slug-dto'
import type { UpdateRoleByOrganizationAndUserDTO } from '../dtos/update-role-by-organization-and-user-dto'

export type FindByUserIdAndOrganizationSlugResponse = Member & {
  organization: Organization
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

  abstract updateRoleByOrganizationAndUser(
    data: UpdateRoleByOrganizationAndUserDTO,
  ): Promise<Member>

  abstract delete(id: string): Promise<void>
}
