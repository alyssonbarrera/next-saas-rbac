import type { User } from '@prisma/client'
import { compare } from 'bcryptjs'

import { AppError } from '@/core/errors/app-error'
import type { UsersRepository } from '@/modules/users/repositories/users-repository'

type AuthenticateWithPasswordUseCaseRequest = {
  email: string
  password: string
}

type AuthenticateWithPasswordUseCaseResponse = {
  user: User
}

export class AuthenticateWithPasswordUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateWithPasswordUseCaseRequest): Promise<AuthenticateWithPasswordUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Invalid credentials.', 401)
    }

    if (!user.passwordHash) {
      throw new AppError(
        'User does not have a password, use social login.',
        401,
      )
    }

    const isPasswordValid = await compare(password, user.passwordHash)

    if (!isPasswordValid) {
      throw new AppError('Invalid credentials.', 401)
    }

    return { user }
  }
}
