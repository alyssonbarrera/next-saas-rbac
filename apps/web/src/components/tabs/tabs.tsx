import { getCurrentOrg } from '@/auth'

import { NavLink } from '../nav-link'
import { Button } from '../ui/button'

export function Tabs() {
  const currentOrganization = getCurrentOrg()

  return (
    <div className="border-b py-4">
      <nav className="mx-auto flex max-w-[1200px] items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="border border-transparent text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
          asChild
        >
          <NavLink href={`/org/${currentOrganization}`}>Projects</NavLink>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="border border-transparent text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
          asChild
        >
          <NavLink href={`/org/${currentOrganization}/members`}>
            Members
          </NavLink>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="border border-transparent text-muted-foreground data-[current=true]:border-border data-[current=true]:text-foreground"
          asChild
        >
          <NavLink href={`/org/${currentOrganization}/settings`}>
            Settings & Billing
          </NavLink>
        </Button>
      </nav>
    </div>
  )
}
