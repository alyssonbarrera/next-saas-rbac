import type { CreateAccountDTO } from '@/modules/accounts/dtos/create-account-dto'
import type { AccountsRepository } from '@/modules/accounts/repositories/accounts-repository'

import { prisma } from '../prisma-service'

export class PrismaAccountsRepository implements AccountsRepository {
  async save(data: CreateAccountDTO) {
    const account = await prisma.account.create({
      data,
    })

    return account
  }
}
