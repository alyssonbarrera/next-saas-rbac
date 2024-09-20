import Link from 'next/link'

import { GithubButton } from '@/components/github-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function SignUpPage() {
  return (
    <div className="space-y-4">
      <form action="" className="space-y-4">
        <div className="space-y-1">
          <Label>Name</Label>
          <Input name="name" type="text" id="name" />
        </div>

        <div className="space-y-1">
          <Label>E-mail</Label>
          <Input name="email" type="email" id="email" />
        </div>

        <div className="space-y-1">
          <Label>Password</Label>
          <Input name="password" type="password" id="password" />
        </div>

        <div className="space-y-1">
          <Label>Confirm your password</Label>
          <Input
            name="password_confirmation"
            type="password"
            id="password_confirmation"
          />
        </div>

        <Button type="submit" className="w-full">
          Create account
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

      <GithubButton title="Sign up with GitHub" />
    </div>
  )
}
