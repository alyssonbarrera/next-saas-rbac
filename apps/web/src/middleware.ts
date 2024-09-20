import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  const authURL = new URL('/auth/sign-in', request.url)
  const homeURL = new URL('/', request.url)

  const authPaths = ['/auth/sign-in', '/auth/sign-up', '/auth/forgot-password']

  if (!token && !authPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(authURL)
  }

  if (token && authPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(homeURL)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|.*svg|.*png|.*jpg|.*jpeg|.*gif|.*webp|_next/image|favicon.ico).*)',
  ],
}
