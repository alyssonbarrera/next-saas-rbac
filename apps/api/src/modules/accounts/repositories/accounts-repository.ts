import type { Account } from '@prisma/client'

import type { CreateAccountDTO } from '../dtos/create-account-dto'

export type AccountsRepositoryFindByProviderAndUserIdDTO = {
  provider: Account['provider']
  userId: string
}

export abstract class AccountsRepository {
  abstract save(data: CreateAccountDTO): Promise<Account>
  abstract findByProviderAndUserId(
    data: AccountsRepositoryFindByProviderAndUserIdDTO,
  ): Promise<Account | null>
}
