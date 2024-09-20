'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { signUpWithEmailAndPassword } from '@/app/auth/sign-up/actions'
import { GithubButton } from '@/components/github-button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useFormState } from '@/hooks/use-form-state'

import { FieldErrorMessage } from '../field-error-message'

export function SignUpForm() {
  const router = useRouter()

  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    signUpWithEmailAndPassword,
    () => router.push('/auth/sign-in'),
  )

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {!success && message && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Sign Up Failed</AlertTitle>

            <AlertDescription>
              <p>{message}</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-1">
          <Label>Name</Label>
          <Input name="name" type="text" id="name" />

          {errors?.name && (
            <FieldErrorMessage>{errors.name[0]}</FieldErrorMessage>
          )}
        </div>

        <div className="space-y-1">
          <Label>E-mail</Label>
          <Input name="email" type="email" id="email" />

          {errors?.email && (
            <FieldErrorMessage>{errors.email[0]}</FieldErrorMessage>
          )}
        </div>

        <div className="space-y-1">
          <Label>Password</Label>
          <Input name="password" type="password" id="password" />

          {errors?.password && (
            <FieldErrorMessage>{errors.password[0]}</FieldErrorMessage>
          )}
        </div>

        <div className="space-y-1">
          <Label>Confirm your password</Label>
          <Input
            name="password_confirmation"
            type="password"
            id="password_confirmation"
          />

          {errors?.password_confirmation && (
            <FieldErrorMessage>
              {errors.password_confirmation[0]}
            </FieldErrorMessage>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Create account'
          )}
        </Button>

        <Button
          type="button"
          className="w-full"
          variant="link"
          asChild
          size="sm"
        >
          <Link href="/auth/sign-in">Already registered? Sign in</Link>
        </Button>
      </form>

      <Separator />

      <GithubButton title="Sign up with GitHub" disabled={isPending} />
    </div>
  )
}
