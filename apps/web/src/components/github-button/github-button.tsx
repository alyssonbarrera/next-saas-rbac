'use client'

import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import { ComponentProps, useActionState } from 'react'

import { signInWithGithub } from '@/app/auth/actions'
import githubIcon from '@/assets/github-icon.svg'
import { cn } from '@/lib/utils'

import { Button } from '../ui/button'

type GithubButtonProps = ComponentProps<'button'> & {
  title: string
}

export function GithubButton({ title, ...props }: GithubButtonProps) {
  const [, formAction, isPending] = useActionState(signInWithGithub, null)

  return (
    <form action={formAction}>
      <Button
        {...props}
        type="submit"
        variant="outline"
        className={cn('w-full', props.className)}
        disabled={isPending || props.disabled}
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
