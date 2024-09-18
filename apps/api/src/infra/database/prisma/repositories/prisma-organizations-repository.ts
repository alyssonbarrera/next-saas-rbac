import type { CreateOrganizationDTO } from '@/modules/organizations/dtos/create-organization-dto'
import { TransferOwnershipDTO } from '@/modules/organizations/dtos/transfer-ownership-dto'
import type { UpdateOrganizationDTO } from '@/modules/organizations/dtos/update-organization-dto'
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

  async findByDomainExcludingId(domain: string, id: string) {
    const organization = await prisma.organization.findFirst({
      where: {
        domain,
        id: {
          not: id,
        },
      },
    })

    return organization
  }

  async update(id: string, organization: UpdateOrganizationDTO) {
    const updatedOrganization = await prisma.organization.update({
      where: {
        id,
      },
      data: organization,
    })

    return updatedOrganization
  }

  async updateOwner(id: string, ownerId: string) {
    const updatedOrganization = await prisma.organization.update({
      where: {
        id,
      },
      data: {
        ownerId,
      },
    })

    return updatedOrganization
  }

  async transferOwnership({
    newOwnerId,
    organizationId,
  }: TransferOwnershipDTO) {
    const [member, organization] = await prisma.$transaction([
      prisma.member.update({
        where: {
          organizationId_userId: {
            organizationId,
            userId: newOwnerId,
          },
        },
        data: {
          role: 'ADMIN',
        },
      }),
      prisma.organization.update({
        where: {
          id: organizationId,
        },
        data: {
          ownerId: newOwnerId,
        },
      }),
    ])

    return { member, organization }
  }

  async delete(id: string) {
    await prisma.organization.delete({
      where: {
        id,
      },
    })
  }
}
