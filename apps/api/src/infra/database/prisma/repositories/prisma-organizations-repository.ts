import { CreateOrganizationDTO } from '@/modules/organizations/dtos/create-organization-dto'
import type {
  OrganizationsRepository,
  OrganizationsRepositoryFindByDomainAndShouldAttachUsersByDomain,
} from '@/modules/organizations/repositories/organizations-repository'

import { prisma } from '../prisma-service'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async save({
    name,
    slug,
    domain,
    ownerId,
    avatarUrl,
    shouldAttachUsersByDomain,
  }: CreateOrganizationDTO) {
    const organization = await prisma.organization.create({
      data: {
        name,
        slug,
        domain,
        ownerId,
        avatarUrl,
        shouldAttachUsersByDomain,
        members: {
          create: {
            userId: ownerId,
            role: 'ADMIN',
          },
        },
      },
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

  async getAll() {
    const organizations = await prisma.organization.findMany()

    return organizations
  }

  async getAllWhereUserIsMember(userId: string) {
    const organizations = await prisma.organization.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        domain: true,
        avatarUrl: true,
        members: {
          select: {
            role: true,
          },
          where: {
            userId,
          },
        },
      },
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
    })

    return organizations
  }

  async findById(id: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        id,
      },
    })

    return organization
  }

  async findBySlug(slug: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        slug,
      },
    })

    return organization
  }

  async findByDomain(domain: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        domain,
      },
    })

    return organization
  }
}
