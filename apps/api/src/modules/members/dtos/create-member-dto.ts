import type { Role } from '@saas/auth'

export type CreateMemberDTO = {
  userId: string
  organizationId: string
  role: Role
}
