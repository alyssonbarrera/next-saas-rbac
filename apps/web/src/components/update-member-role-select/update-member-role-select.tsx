'use client'

import { Role } from '@saas/auth'
import { ComponentProps } from 'react'

import { updateMemberAction } from '@/app/(app)/org/[slug]/members/actions'
import { Select } from '@/components/ui/select'

import { RoleSelect } from '../role-select'

type UpdateMemberRoleSelectProps = ComponentProps<typeof Select> & {
  memberId: string
}

export function UpdateMemberRoleSelect({
  memberId,
  ...props
}: UpdateMemberRoleSelectProps) {
  async function updateMemberRole(role: Role) {
    await updateMemberAction(memberId, role)
  }

  return (
    <RoleSelect
      {...props}
      onValueChange={updateMemberRole}
      triggerProps={{
        className: 'w-32 h-9',
      }}
    />
  )
}
