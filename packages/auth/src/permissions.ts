import type { AbilityBuilder } from '@casl/ability'

import type { AppAbility } from './index'
import { User } from './models/user'

export type Role = 'ADMIN' | 'MEMBER'

type PermissionsByRole = (
  user: User,
  builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionsByRole> = {
  ADMIN: (_user, { can }) => {
    can('manage', 'all')
  },
  MEMBER: (_user, { can }) => {
    can('invite', 'User')
    can('manage', 'Project')
  },
}
