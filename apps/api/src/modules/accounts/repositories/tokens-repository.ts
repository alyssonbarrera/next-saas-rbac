import { Token } from '@prisma/client'

export type TokensRepositorySaveTokenDTO = {
  type: Token['type']
  userId: string
}

export abstract class TokensRepository {
  abstract save(data: TokensRepositorySaveTokenDTO): Promise<Token>
  abstract findById(id: string): Promise<Token | null>
  abstract delete(id: string): Promise<void>
}
