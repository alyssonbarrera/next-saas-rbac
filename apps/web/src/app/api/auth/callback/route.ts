import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { signInWithGithubRequest } from '@/http/requests/accounts/sign-in-with-github-request'
import { acceptInviteRequest } from '@/http/requests/invites/accept-invite-request'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.json(
      { message: 'Github OAuth code was not found.' },
      { status: 400 },
    )
  }

  const { token } = await signInWithGithubRequest({ code })

  const cookieStore = await cookies()
  cookieStore.set('token', token, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7days
  })

  const inviteId = cookieStore.get('inviteId')?.value

  if (inviteId) {
    try {
      await acceptInviteRequest({ inviteId })
      cookieStore.delete('inviteId')
    } catch {}
  }

  const redirectURL = request.nextUrl.clone()

  redirectURL.pathname = '/'
  redirectURL.search = ''

  return NextResponse.redirect(redirectURL)
}
