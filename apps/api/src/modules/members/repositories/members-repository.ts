import type { Member, Organization, Prisma } from '@prisma/client'
import type { Role } from '@saas/auth'

import type { CreateMemberDTO } from '../dtos/create-member-dto'
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
  abstract save(data: CreateMemberDTO): Promise<Member>
  abstract saveAndDeleteInvite(
    data: CreateMemberDTO,
    inviteId: string,
  ): Promise<Member>

  abstract findByUserIdAndOrganizationSlug(
    params: FindByUserIdAndOrganizationSlugDTO,
  ): Promise<FindByUserIdAndOrganizationSlugResponse | null>

  abstract findMemberByOrganizationAndUser(
    organizationId: string,
    userId: string,
  ): Promise<Member | null>

  abstract findMemberByIdAndOrganization(
    memberId: string,
    organizationId: string,
  ): Promise<Member | null>

  abstract findAllByOrganizationId(
    organizationId: string,
  ): Promise<MemberWithUser[]>

  abstract findByEmailAndOrganization(
    email: string,
    organizationId: string,
  ): Promise<Member | null>

  abstract updateRoleByOrganizationAndUser(
    data: UpdateRoleByOrganizationAndUserDTO,
  ): Promise<Member>

  abstract update({
    id,
    organizationId,
    data,
  }: {
    id: string
    organizationId: string
    data: Prisma.MemberUpdateInput
  }): Promise<Member>

  abstract delete(id: string): Promise<void>
  abstract deleteByOrganization(
    id: string,
    organizationId: string,
  ): Promise<void>

  abstract countByOrganization(organizationId: string): Promise<number>
}
