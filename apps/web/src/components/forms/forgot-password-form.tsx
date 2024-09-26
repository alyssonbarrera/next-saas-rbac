'use client'

import { AlertTriangle, CheckCircle, Loader2 } from 'lucide-react'
import Link from 'next/link'

import { forgotPasswordAction } from '@/app/auth/forgot-password/actions'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import { FieldErrorMessage } from '../field-error-message'

export function ForgotPasswordForm() {
  const [{ success, message, errors }, handleSubmit, isPending] =
    useFormState(forgotPasswordAction)

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!success && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Sign In Failed</AlertTitle>

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
        <Label>E-mail</Label>
        <Input name="email" type="email" id="email" />

        {errors?.email && (
          <FieldErrorMessage>{errors.email[0]}</FieldErrorMessage>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Recover password'
        )}
      </Button>

      <Button type="button" className="w-full" variant="link" asChild size="sm">
        <Link href="/auth/sign-up">Sign in instead</Link>
      </Button>
    </form>
  )
}
