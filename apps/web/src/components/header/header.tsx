import { Slash } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'

import rocketseatIcon from '@/assets/rocketseat-icon.svg'
import { ability } from '@/auth'

import { OrganizationSwitcher } from '../organization-switcher'
import { PendingInvites } from '../pending-invites'
import { ProfileButton } from '../profile-button'
import { ProjectSwitcher } from '../project-switcher'
import { ThemeSwitcher } from '../theme'
import { Separator } from '../ui/separator'

export async function Header() {
  const permissions = await ability()

  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 xl:px-0">
      <div className="flex items-center gap-3">
        <Link href="/">
          <Image
            src={rocketseatIcon}
            className="size-6 dark:invert"
            alt="Rocketseat"
          />
        </Link>

        <Slash className="size-3 -rotate-[24deg] text-border" />

        <OrganizationSwitcher />

        {permissions?.can('get', 'Project') && (
          <Fragment>
            <Slash className="size-3 -rotate-[24deg] text-border" />
            <ProjectSwitcher />
          </Fragment>
        )}
      </div>
      <div className="flex items-center gap-4">
        <PendingInvites />
        <ThemeSwitcher />
        <Separator orientation="vertical" className="h-5" />
        <ProfileButton />
      </div>
    </div>
  )
}
