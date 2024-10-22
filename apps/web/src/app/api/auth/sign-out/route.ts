import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const redirectURL = request.nextUrl.clone()

  redirectURL.pathname = '/auth/sign-in'

  const cookieStore = await cookies()
  cookieStore.delete('token')

  return NextResponse.redirect(redirectURL)
}
