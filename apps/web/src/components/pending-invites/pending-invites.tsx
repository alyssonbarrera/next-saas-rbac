import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Check, UserCircle, UserPlus2, X } from 'lucide-react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { getPendingInvitesRequest } from '@/http/requests/invites/get-pending-invites-request'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'

dayjs.extend(relativeTime)

export async function PendingInvites() {
  const { invites } = await getPendingInvitesRequest()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost">
          <UserPlus2 className="size-4" />
          <span className="sr-only">Pending invites</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <span className="block text-sm font-medium">
          Pending invites ({invites.length})
        </span>

        <div className="space-y-2">
          {invites.map((invite) => (
            <div key={invite.id} className="space-y-1">
              <div className="flex items-center space-y-4">
                {invite.author && invite.author.avatarUrl ? (
                  <Avatar className="mr-2 size-6">
                    <AvatarFallback />
                    <AvatarImage src={invite.author.avatarUrl} />
                  </Avatar>
                ) : (
                  <UserCircle className="size-4" />
                )}
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {invite.author?.name ?? 'Someone'}
                  </span>{' '}
                  invited you to join{' '}
                  <span className="font-medium text-foreground">
                    {invite.organization.name}
                  </span>{' '}
                  <span>{dayjs(invite.createdAt).fromNow()}</span>
                </p>
              </div>

              <div className="ml-8 flex gap-1">
                <Button size="xs" variant="outline">
                  <Check className="mr-1.5 size-3" />
                  Accept
                </Button>

                <Button
                  size="xs"
                  variant="ghost"
                  className="text-muted-foreground"
                >
                  <X className="mr-1.5 size-3" />
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
