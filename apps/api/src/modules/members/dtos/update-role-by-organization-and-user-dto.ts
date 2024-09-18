import { Role } from '@saas/auth'

export type UpdateRoleByOrganizationAndUserDTO = {
  role: Role
  userId: string
  organizationId: string
}
