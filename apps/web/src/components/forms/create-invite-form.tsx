'use client'

import { AlertTriangle, Loader2, UserPlus } from 'lucide-react'

import { createInviteAction } from '@/app/(app)/org/[slug]/members/actions'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useFormState } from '@/hooks/use-form-state'

import { FieldErrorMessage } from '../field-error-message'

export function CreateInviteForm() {
  const [{ success, message, errors }, handleSubmit, isPending] =
    useFormState(createInviteAction)

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!success && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Invite Failed</AlertTitle>

          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex items-center gap-2">
        <div className="flex-1 space-y-1">
          <Input
            name="email"
            type="email"
            id="email"
            placeholder="john@example.com"
          />

          {errors && (
            <FieldErrorMessage>
              {errors?.email && errors.email[0]}
            </FieldErrorMessage>
          )}
        </div>

        <div className="space-y-1">
          <Select name="role" defaultValue="MEMBER">
            <SelectTrigger className="w-32">
              <SelectValue className="capitalize" placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="MEMBER">Member</SelectItem>
              <SelectItem value="BILLING">Billing</SelectItem>
            </SelectContent>
          </Select>

          {errors && (
            <FieldErrorMessage className="invisible">
              {errors?.role ? errors.role[0] : 'error'}
            </FieldErrorMessage>
          )}
        </div>

        <div className="space-y-1">
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
            {!isPending && <UserPlus className="mr-2 size-4" />}
            Invite user
          </Button>

          {errors && (
            <FieldErrorMessage className="invisible">error</FieldErrorMessage>
          )}
        </div>
      </div>
    </form>
  )
}
