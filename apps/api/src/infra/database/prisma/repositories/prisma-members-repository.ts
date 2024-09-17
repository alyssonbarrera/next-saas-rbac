import { Prisma } from '@prisma/client'

import type { FindByUserIdAndOrganizationSlugDTO } from '@/modules/members/dtos/find-by-user-id-and-organization-slug-dto'
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
}
