import type { User } from '@prisma/client'

import type { CreateUserDTO } from '../dtos/create-user-dto'

export abstract class UsersRepository {
  abstract save(data: CreateUserDTO): Promise<User>
  abstract saveWithOrganization(
    data: CreateUserDTO,
    organizationId?: string,
  ): Promise<User>

  abstract findByEmail(email: string): Promise<User | null>
}
