'use client'

import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { useActionState } from 'react'

import { signInWithGithub } from '@/app/auth/actions'
import githubIcon from '@/assets/github-icon.svg'

import { Button } from '../ui/button'

type GithubButtonProps = {
  title: string
}

export function GithubButton({ title }: GithubButtonProps) {
  const [, formAction, isPending] = useActionState(signInWithGithub, null)

  return (
    <form action={formAction}>
      <Button
        type="submit"
        variant="outline"
        className="w-full"
        disabled={isPending}
      >
        {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
        {!isPending && (
          <Image
            src={githubIcon}
            alt="GitHub icon"
            aria-disabled="true"
            className="mr-2 size-4 dark:invert"
          />
        )}

        {title}
      </Button>
    </form>
  )
}
