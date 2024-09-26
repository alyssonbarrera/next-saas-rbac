import { ComponentProps } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type RoleSelectProps = ComponentProps<typeof Select> & {
  triggerProps?: ComponentProps<typeof SelectTrigger>
}

export function RoleSelect({ triggerProps, ...props }: RoleSelectProps) {
  return (
    <Select {...props}>
      <SelectTrigger {...triggerProps}>
        <SelectValue className="capitalize" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="ADMIN">Admin</SelectItem>
        <SelectItem value="MEMBER">Member</SelectItem>
        <SelectItem value="BILLING">Billing</SelectItem>
      </SelectContent>
    </Select>
  )
}
