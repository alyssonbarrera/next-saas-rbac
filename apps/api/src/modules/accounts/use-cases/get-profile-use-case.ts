import { AppError } from '@/core/errors/app-error'
import type { UsersRepository } from '@/modules/users/repositories/users-repository'

type GetProfileUseCaseRequest = {
  id: string
}

type GetProfileUseCaseResponse = {
  user: {
    id: string
    name: string | null
    email: string
    avatarUrl: string | null
  }
}

export class GetProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    id,
  }: GetProfileUseCaseRequest): Promise<GetProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new AppError('User not found', 400)
    }

    return { user }
  }
}
