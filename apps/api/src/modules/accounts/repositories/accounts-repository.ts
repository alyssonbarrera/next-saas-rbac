import type { Account } from '@prisma/client'

import type { CreateAccountDTO } from '../dtos/create-account-dto'

export abstract class AccountsRepository {
  abstract save(data: CreateAccountDTO): Promise<Account>
}
