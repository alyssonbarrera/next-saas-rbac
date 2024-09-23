'use client'

import { AlertTriangle, CheckCircle, Loader2 } from 'lucide-react'

import { createOrganizationAction } from '@/app/(app)/create-organization/actions'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import { FieldErrorMessage } from '../field-error-message'
import { Checkbox } from '../ui/checkbox'

export function OrganizationForm() {
  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    createOrganizationAction,
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!success && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Save Organization Failed</AlertTitle>

          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      {success && message && (
        <Alert variant="success">
          <CheckCircle className="size-4" />
          <AlertTitle>Success!</AlertTitle>

          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-1">
        <Label htmlFor="name">Organization name</Label>
        <Input name="name" type="text" id="name" />

        {errors?.name && (
          <FieldErrorMessage>{errors.name[0]}</FieldErrorMessage>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="domain">E-mail domain</Label>
        <Input
          name="domain"
          type="text"
          id="domain"
          inputMode="url"
          placeholder="example.com"
        />

        {errors?.domain && (
          <FieldErrorMessage>{errors.domain[0]}</FieldErrorMessage>
        )}
      </div>

      <div className="flex items-start gap-2">
        <Checkbox
          id="shouldAttachUsersByDomain"
          name="shouldAttachUsersByDomain"
          className="mt-1"
        />

        <label htmlFor="shouldAttachUsersByDomain" className="space-y-1">
          <span className="text-sm font-medium leading-none">
            Auto-join new members
          </span>
          <p className="text-sm text-muted-foreground">
            This will automatically invite all members with same e-mail domain
            to this organization.
          </p>
        </label>
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Save organization'
        )}
      </Button>
    </form>
  )
}
