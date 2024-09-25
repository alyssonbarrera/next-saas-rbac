import { useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { Check, UserCircle, X } from 'lucide-react'
import { ComponentProps } from 'react'

import { InviteWithAuthorAndOrganization } from '@/http/requests/invites/get-pending-invites-request'
import { cn } from '@/lib/utils'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { acceptInviteAction, rejectInviteAction } from './actions'

type PendingInviteCardProps = ComponentProps<'div'> & {
  invite: InviteWithAuthorAndOrganization
}

export function PendingInviteCard({
  invite,
  ...props
}: PendingInviteCardProps) {
  const queryClient = useQueryClient()

  async function handleAcceptInvite(inviteId: string) {
    await acceptInviteAction(inviteId)

    queryClient.invalidateQueries({
      queryKey: ['pending-invites'],
    })
  }

  async function handleRejectInvite(inviteId: string) {
    await rejectInviteAction(inviteId)

    queryClient.invalidateQueries({
      queryKey: ['pending-invites'],
    })
  }

  return (
    <div {...props} className={cn('space-y-1', props.className)}>
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
        <Button
          size="xs"
          variant="outline"
          onClick={() => handleAcceptInvite(invite.id)}
        >
          <Check className="mr-1.5 size-3" />
          Accept
        </Button>

        <Button
          size="xs"
          variant="ghost"
          className="text-muted-foreground"
          onClick={() => handleRejectInvite(invite.id)}
        >
          <X className="mr-1.5 size-3" />
          Reject
        </Button>
      </div>
    </div>
  )
}
