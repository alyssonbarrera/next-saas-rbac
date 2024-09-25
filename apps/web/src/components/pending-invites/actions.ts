'use server'

import { revalidateTag } from 'next/cache'

import { acceptInviteRequest } from '@/http/requests/invites/accept-invite-request'
import { rejectInviteRequest } from '@/http/requests/invites/reject-invite-request'

export async function acceptInviteAction(inviteId: string) {
  await acceptInviteRequest({ inviteId })
  revalidateTag('organizations')
}

export async function rejectInviteAction(inviteId: string) {
  await rejectInviteRequest({ inviteId })
}
