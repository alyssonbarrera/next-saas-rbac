import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { getInviteRequest } from '@/http/requests/invites/get-invite-request'

dayjs.extend(relativeTime)

type InvitePageProps = {
  params: {
    id: string
  }
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { invite } = await getInviteRequest({ inviteId: params.id })

  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-4">
      <div className="flex w-full max-w-sm flex-col justify-center space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="size-16">
            {invite.author?.avatarUrl && (
              <AvatarImage src={invite.author.avatarUrl} />
            )}
            <AvatarFallback />
          </Avatar>
          <p className="text-balance text-center leading-relaxed text-muted-foreground">
            <span className="font-medium text-foreground">
              {invite.author?.name ?? 'Someone'}
            </span>{' '}
            invited you to join{' '}
            <span className="font-medium text-foreground">
              {invite.organization.name}
            </span>
            .{' '}
            <span className="text-xs">{dayjs(invite.createdAt).fromNow()}</span>
          </p>
        </div>
        <Separator />
      </div>
    </div>
  )
}
