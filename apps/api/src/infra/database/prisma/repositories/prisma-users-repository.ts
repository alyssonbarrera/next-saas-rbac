import type { CreateUserDTO } from '@/modules/users/dtos/create-user-dto'
import type { UsersRepository } from '@/modules/users/repositories/users-repository'

import { prisma } from '../prisma-service'

export class PrismaUsersRepository implements UsersRepository {
  async save(data: CreateUserDTO) {
    const user = await prisma.user.create({
      data,
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
}
