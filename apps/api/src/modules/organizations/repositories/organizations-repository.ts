import type { $Enums, Member, Organization } from '@prisma/client'

import type { CreateOrganizationDTO } from '../dtos/create-organization-dto'
import type { TransferOwnershipDTO } from '../dtos/transfer-ownership-dto'
import type { UpdateOrganizationDTO } from '../dtos/update-organization-dto'

export type OrganizationsRepositoryFindByDomainAndShouldAttachUsersByDomain = {
  domain: string
  shouldAttachUsersByDomain: boolean
}

export type OrganizationsRepositoryGetAllWhereUserIsMemberResponse = {
  name: string
  id: string
  slug: string
  domain: string | null
  avatarUrl: string | null
  members: {
    role: $Enums.Role
  }[]
}

export abstract class OrganizationsRepository {
  abstract save(data: CreateOrganizationDTO): Promise<Organization>
  abstract findByDomainAndShouldAttachUsersByDomain({
    domain,
    shouldAttachUsersByDomain,
  }: OrganizationsRepositoryFindByDomainAndShouldAttachUsersByDomain): Promise<Organization | null>

  abstract getAll(): Promise<Organization[]>
  abstract getAllWhereUserIsMember(
    userId: string,
  ): Promise<OrganizationsRepositoryGetAllWhereUserIsMemberResponse[]>

  abstract findById(id: string): Promise<Organization | null>
  abstract findBySlug(slug: string): Promise<Organization | null>
  abstract findByDomain(domain: string): Promise<Organization | null>
  abstract findByDomainExcludingId(
    domain: string,
    id: string,
  ): Promise<Organization | null>

  abstract update(
    id: string,
    data: UpdateOrganizationDTO,
  ): Promise<Organization>

  abstract updateOwner(id: string, ownerId: string): Promise<Organization>

  abstract transferOwnership({
    newOwnerId,
    organizationId,
  }: TransferOwnershipDTO): Promise<{
    member: Member
    organization: Organization
  }>

  abstract delete(id: string): Promise<void>
}
