import { Prisma } from '@prisma/client'

import type { FindByUserIdAndOrganizationSlugDTO } from '@/modules/members/dtos/find-by-user-id-and-organization-slug-dto'
import type { UpdateRoleByOrganizationAndUserDTO } from '@/modules/members/dtos/update-role-by-organization-and-user-dto'
import type { MembersRepository } from '@/modules/members/repositories/members-repository'

import { prisma } from '../prisma-service'

export class PrismaMembersRepository implements MembersRepository {
  async save(data: Prisma.MemberCreateInput) {
    const member = await prisma.member.create({
      data,
    })

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

  async delete(id: string) {
    await prisma.member.delete({
      where: {
        id,
      },
    })
  }
}
