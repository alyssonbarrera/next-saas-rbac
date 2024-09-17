import type { AccountProvider } from '@prisma/client'

export type CreateAccountDTO = {
  id?: string
  provider: AccountProvider
  providerAccountId: string

  userId: string
}
