import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  const { pathname } = request.nextUrl
  const pathnameStartsWithOrg = pathname.startsWith('/org')
  const projectPathRegex = /\/org\/.+\/project\/.+/
  const pathnameIncludesProject = projectPathRegex.test(pathname)

  const response = NextResponse.next()

  if (pathnameStartsWithOrg) {
    const [, , slug] = pathname.split('/')

    response.cookies.set('org', slug)
  } else {
    response.cookies.delete('org')
  }

  if (pathnameIncludesProject) {
    const [, , , , projectSlug] = pathname.split('/')

    response.cookies.set('project', projectSlug)
  } else {
    response.cookies.delete('project')
  }

  const authURL = new URL('/auth/sign-in', request.url)
  const homeURL = new URL('/', request.url)

  const publicPaths = ['/invite/*']
  const authPaths = ['/auth/sign-in', '/auth/sign-up', '/auth/forgot-password']

  const publicPathRegexes = publicPaths.map(
    (path) => new RegExp(`^${path.replace('*', '.*')}$`),
  )

  if (publicPathRegexes.some((regex) => regex.test(pathname))) {
    return response
  }

  if (!token && !authPaths.includes(pathname)) {
    return NextResponse.redirect(authURL)
  }

  if (token && authPaths.includes(pathname)) {
    return NextResponse.redirect(homeURL)
  }

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|.*svg|.*png|.*jpg|.*jpeg|.*gif|.*webp|_next/image|favicon.ico).*)',
  ],
}
