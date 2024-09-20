'use client'

import { AlertTriangle, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { FieldErrorMessage } from '@/components/field-error-message'
import { GithubButton } from '@/components/github-button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useFormState } from '@/hooks/use-form-state'

import { signInWithEmailAndPassword } from '../../app/auth/sign-in/actions'

export function SignInForm() {
  const router = useRouter()

  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    signInWithEmailAndPassword,
    () => router.push('/'),
  )

  return (
    <div className="space-y-4">
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

          <Link
            href="/auth/forgot-password"
            className="text-xs font-medium text-foreground hover:underline"
          >
            Forgot your password?
          </Link>
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            'Sign in with e-mail'
          )}
        </Button>

        <Button
          type="button"
          className="w-full"
          variant="link"
          asChild
          size="sm"
        >
          <Link href="/auth/sign-up">Create new account</Link>
        </Button>
      </form>

      <Separator />

      <GithubButton title="Sign in with GitHub" disabled={isPending} />
    </div>
  )
}
