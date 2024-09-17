import { Organization } from '@prisma/client'

import { CreateOrganizationDTO } from '../dtos/create-organization-dto'

export type OrganizationsRepositoryFindByDomainAndShouldAttachUsersByDomain = {
  domain: string
  shouldAttachUsersByDomain: boolean
}

export abstract class OrganizationsRepository {
  abstract save(data: CreateOrganizationDTO): Promise<Organization>
  abstract findByDomainAndShouldAttachUsersByDomain({
    domain,
    shouldAttachUsersByDomain,
  }: OrganizationsRepositoryFindByDomainAndShouldAttachUsersByDomain): Promise<Organization | null>

  abstract findById(id: string): Promise<Organization | null>
  abstract findByDomain(domain: string): Promise<Organization | null>
}
