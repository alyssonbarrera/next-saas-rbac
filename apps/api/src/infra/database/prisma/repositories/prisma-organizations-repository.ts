import { CreateOrganizationDTO } from '@/modules/organizations/dtos/create-organization-dto'
import type {
  OrganizationsRepository,
  OrganizationsRepositoryFindByDomainAndShouldAttachUsersByDomain,
} from '@/modules/organizations/repositories/organizations-repository'

import { prisma } from '../prisma-service'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async save(data: CreateOrganizationDTO) {
    const organization = await prisma.organization.create({
      data,
    })

    return organization
  }

  async findByDomainAndShouldAttachUsersByDomain({
    domain,
    shouldAttachUsersByDomain,
  }: OrganizationsRepositoryFindByDomainAndShouldAttachUsersByDomain) {
    const organization = await prisma.organization.findUnique({
      where: {
        domain,
        shouldAttachUsersByDomain,
      },
    })

    return organization
  }
}
