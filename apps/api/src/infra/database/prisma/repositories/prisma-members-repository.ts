import { Prisma } from '@prisma/client'

import { CreateMemberDTO } from '@/modules/members/dtos/create-member-dto'
import type { FindByUserIdAndOrganizationSlugDTO } from '@/modules/members/dtos/find-by-user-id-and-organization-slug-dto'
import type { UpdateRoleByOrganizationAndUserDTO } from '@/modules/members/dtos/update-role-by-organization-and-user-dto'
import type { MembersRepository } from '@/modules/members/repositories/members-repository'

import { prisma } from '../prisma-service'

export class PrismaMembersRepository implements MembersRepository {
  async save(data: CreateMemberDTO) {
    const member = await prisma.member.create({
      data,
    })

    return member
  }

  async saveAndDeleteInvite(data: CreateMemberDTO, inviteId: string) {
    const [member] = await prisma.$transaction([
      prisma.member.create({
        data,
      }),
      prisma.invite.delete({
        where: {
          id: inviteId,
        },
      }),
    ])

    return member
  }

  async findByUserIdAndOrganizationSlug({
    userId,
    organizationSlug,
  }: FindByUserIdAndOrganizationSlugDTO) {
    const member = await prisma.member.findFirst({
      where: {
        userId,
        organization: {
          slug: organizationSlug,
        },
      },
      include: {
        organization: true,
      },
    })

    return member
  }

  async findMemberByOrganizationAndUser(
    organizationId: string,
    userId: string,
  ) {
    const member = await prisma.member.findUnique({
      where: {
        organizationId_userId: {
          organizationId,
          userId,
        },
      },
    })

    return member
  }

  async findAllByOrganizationId(organizationId: string) {
    const members = await prisma.member.findMany({
      select: {
        id: true,
        role: true,
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
      where: {
        organizationId,
      },
      orderBy: {
        role: 'asc',
      },
    })

    return members
  }

  async findMemberByIdAndOrganization(
    memberId: string,
    organizationId: string,
  ) {
    const member = await prisma.member.findUnique({
      where: {
        id: memberId,
        organizationId,
      },
    })

    return member
  }

  async findByEmailAndOrganization(email: string, organizationId: string) {
    const member = await prisma.member.findFirst({
      where: {
        organizationId,
        user: {
          email,
        },
      },
    })

    return member
  }

  async updateRoleByOrganizationAndUser({
    role,
    userId,
    organizationId,
  }: UpdateRoleByOrganizationAndUserDTO) {
    const member = await prisma.member.update({
      where: {
        organizationId_userId: {
          organizationId,
          userId,
        },
      },
      data: {
        role,
      },
    })

    return member
  }

  async update({
    id,
    organizationId,
    data,
  }: {
    id: string
    organizationId: string
    data: Prisma.MemberUpdateInput
  }) {
    const member = await prisma.member.update({
      where: {
        id,
        organizationId,
      },
      data,
    })

    return member
  }

  async delete(id: string) {
    await prisma.member.delete({
      where: {
        id,
      },
    })
  }

  async deleteByOrganization(id: string, organizationId: string) {
    await prisma.member.delete({
      where: {
        id,
        organizationId,
      },
    })
  }

  async countByOrganization(organizationId: string) {
    const count = await prisma.member.count({
      where: {
        organizationId,
        role: { not: 'BILLING' },
      },
    })

    return count
  }
}
