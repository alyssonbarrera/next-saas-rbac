import type { CreateInviteDTO } from '@/modules/invites/dtos/create-invite-dto'
import type { InvitesRepository } from '@/modules/invites/repositories/invites-repository'

import { prisma } from '../prisma-service'

export class PrismaInvitesRepository implements InvitesRepository {
  async save(data: CreateInviteDTO) {
    const invite = await prisma.invite.create({
      data,
    })

    return invite
  }

  async findById(id: string) {
    const invite = await prisma.invite.findUnique({
      where: {
        id,
      },
    })

    return invite
  }

  async findByEmail(email: string) {
    const invite = await prisma.invite.findFirst({
      where: {
        email,
      },
    })

    return invite
  }

  async findByEmailAndOrganization(email: string, organizationId: string) {
    const invite = await prisma.invite.findUnique({
      where: {
        email_organizationId: {
          email,
          organizationId,
        },
      },
    })

    return invite
  }

  async delete(id: string) {
    await prisma.invite.delete({
      where: {
        id,
      },
    })
  }

  async deleteByEmailAndOrganization(email: string, organizationId: string) {
    await prisma.invite.deleteMany({
      where: {
        email,
        organizationId,
      },
    })
  }
}
