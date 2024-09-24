'use client'

import { AlertTriangle, CheckCircle, Loader2 } from 'lucide-react'
import { useParams } from 'next/navigation'

import { createProjectAction } from '@/app/(app)/org/[slug]/create-project/actions'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'
import { queryClient } from '@/lib/react-query'

import { FieldErrorMessage } from '../field-error-message'
import { Textarea } from '../ui/textarea'

export function ProjectForm() {
  const { slug: organizationSlug } = useParams<{
    slug: string
  }>()

  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    createProjectAction,
    () => {
      queryClient.invalidateQueries({
        queryKey: [organizationSlug, 'projects'],
      })
    },
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!success && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Save Project Failed</AlertTitle>

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
        <Label htmlFor="name">Project name</Label>
        <Input name="name" type="text" id="name" />

        {errors?.name && (
          <FieldErrorMessage>{errors.name[0]}</FieldErrorMessage>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="description">Description</Label>
        <Textarea name="description" id="description" />

        {errors?.description && (
          <FieldErrorMessage>{errors.description[0]}</FieldErrorMessage>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Save project'
        )}
      </Button>
    </form>
  )
}
