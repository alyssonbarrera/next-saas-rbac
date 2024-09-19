import type { Role } from '@saas/auth'

export type CreateInviteDTO = {
  role: Role
  email: string
  authorId: string
  organizationId: string
}
