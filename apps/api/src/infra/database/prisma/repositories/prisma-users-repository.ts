import type { CreateUserDTO } from '@/modules/users/dtos/create-user-dto'
import type { UpdatePasswordAndDeleteTokenDTO } from '@/modules/users/dtos/update-password-dto'
import type { UsersRepository } from '@/modules/users/repositories/users-repository'

import { prisma } from '../prisma-service'

export class PrismaUsersRepository implements UsersRepository {
  async save(data: CreateUserDTO) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async saveWithOrganization(data: CreateUserDTO, organizationId: string) {
    const user = await prisma.user.create({
      data: {
        ...data,
        member_on: organizationId
          ? {
              create: {
                organizationId,
              },
            }
          : undefined,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
      },
    })

    return user
  }

  async updatePasswordAndDeleteToken({
    userId,
    tokenId,
    password,
  }: UpdatePasswordAndDeleteTokenDTO) {
    const [user] = await prisma.$transaction([
      prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          passwordHash: password,
        },
      }),
      prisma.token.delete({
        where: {
          id: tokenId,
        },
      }),
    ])

    return user
  }
}
