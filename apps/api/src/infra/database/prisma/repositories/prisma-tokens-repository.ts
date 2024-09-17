import type {
  TokensRepository,
  TokensRepositorySaveTokenDTO,
} from '@/modules/accounts/repositories/tokens-repository'

import { prisma } from '../prisma-service'

export class PrismaTokensRepository implements TokensRepository {
  async save(data: TokensRepositorySaveTokenDTO) {
    const token = await prisma.token.create({
      data,
    })

    return token
  }

  async findById(id: string) {
    const token = await prisma.token.findUnique({
      where: {
        id,
      },
    })

    return token
  }

  async delete(id: string) {
    await prisma.token.delete({
      where: {
        id,
      },
    })
  }
}
