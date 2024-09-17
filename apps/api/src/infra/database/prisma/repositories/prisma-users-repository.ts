import type { CreateUserDTO } from '@/modules/users/dtos/create-user-dto'
import type { UpdatePasswordDTO } from '@/modules/users/dtos/update-password-dto'
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

  async updatePassword({ id, password }: UpdatePasswordDTO) {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        passwordHash: password,
      },
    })

    return user
  }
}
