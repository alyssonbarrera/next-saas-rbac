'use client'

import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { UserPlus2 } from 'lucide-react'
import { Fragment, useState } from 'react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { getPendingInvitesRequest } from '@/http/requests/invites/get-pending-invites-request'

import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'
import { PendingInviteCard } from './pending-invite-card'

dayjs.extend(relativeTime)

export function PendingInvites() {
  const [isOpen, setIsOpen] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['pending-invites'],
    queryFn: getPendingInvitesRequest,
    enabled: isOpen,
  })

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost">
          <UserPlus2 className="size-4" />
          <span className="sr-only">Pending invites</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 space-y-2">
        {isLoading && (
          <Fragment>
            <div className="flex items-center gap-2">
              <Skeleton className="size-6 rounded-full" />
              <Skeleton className="h-4 w-full rounded" />
            </div>

            <Skeleton className="ml-8 h-4 rounded" style={{ width: '50%' }} />

            <div className="ml-8 flex items-center gap-1">
              <Skeleton className="mt-1 h-4 rounded" style={{ width: 60 }} />
              <Skeleton className="mt-1 h-4 rounded" style={{ width: 60 }} />
            </div>
          </Fragment>
        )}

        <span className="block text-sm font-medium">
          Pending invites ({data?.invites.length ?? 0})
        </span>

        {data?.invites.length === 0 && (
          <p className="text-sm text-muted-foreground ">No invites found.</p>
        )}

        <div className="space-y-2">
          {data &&
            data.invites.map((invite) => (
              <PendingInviteCard key={invite.id} invite={invite} />
            ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
