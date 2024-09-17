import { Member, Organization, Prisma } from '@prisma/client'

import type { FindByUserIdAndOrganizationSlugDTO } from '../dtos/find-by-user-id-and-organization-slug-dto'

export type FindByUserIdAndOrganizationSlugResponse = Member & {
  organization: Organization
}

export abstract class MembersRepository {
  abstract save(member: Prisma.MemberCreateInput): Promise<Member>
  abstract findByUserIdAndOrganizationSlug(
    params: FindByUserIdAndOrganizationSlugDTO,
  ): Promise<FindByUserIdAndOrganizationSlugResponse | null>
}
