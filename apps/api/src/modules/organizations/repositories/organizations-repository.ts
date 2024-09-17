import { $Enums, Organization } from '@prisma/client'

import { CreateOrganizationDTO } from '../dtos/create-organization-dto'

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
}
