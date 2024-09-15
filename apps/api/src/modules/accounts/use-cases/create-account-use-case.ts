import type { User } from '@prisma/client'
import { hash } from 'bcryptjs'

import { AppError } from '@/core/errors/app-error'
import type { UsersRepository } from '@/modules/users/repositories/users-repository'

import type { AccountsRepository } from '../repositories/accounts-repository'

type CreateAccountUseCaseRequest = {
  name: string
  email: string
  password: string
}

type CreateAccountUseCaseResponse = {
  user: User
}

export class CreateAccountUseCase {
  constructor(
    private accountsRepository: AccountsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    name,
    email,
    password,
  }: CreateAccountUseCaseRequest): Promise<CreateAccountUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new AppError('User already exists', 409)
    }

    const hashedPassword = await hash(password, 14)

    const user = await this.usersRepository.save({
      name,
      email,
      passwordHash: hashedPassword,
    })

    return { user }
  }
}
