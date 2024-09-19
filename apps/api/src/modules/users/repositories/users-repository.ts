import type { User } from '@prisma/client'

import type { CreateUserDTO } from '../dtos/create-user-dto'
import type { UpdatePasswordAndDeleteTokenDTO } from '../dtos/update-password-dto'

type UsersRepositoryFindByIdResponse = {
  id: string
  name: string | null
  email: string
  avatarUrl: string | null
} | null

export abstract class UsersRepository {
  abstract save(data: CreateUserDTO): Promise<User>
  abstract saveWithOrganization(
    data: CreateUserDTO,
    organizationId?: string,
  ): Promise<User>

  abstract findByEmail(email: string): Promise<User | null>
  abstract findById(id: string): Promise<UsersRepositoryFindByIdResponse | null>

  abstract updatePasswordAndDeleteToken(
    data: UpdatePasswordAndDeleteTokenDTO,
  ): Promise<User>
}
