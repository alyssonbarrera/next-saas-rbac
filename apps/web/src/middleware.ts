import { NextRequest, NextResponse } from 'next/server'

function setOrgCookieIfPathStartsWithOrg(
  request: NextRequest,
  response: NextResponse,
) {
  const { pathname } = request.nextUrl
  const pathnameStartsWithOrg = pathname.startsWith('/org')

  if (pathnameStartsWithOrg) {
    const [, , slug] = pathname.split('/')

    response.cookies.set('org', slug)
  } else {
    response.cookies.delete('org')
  }
}

function setProjectCookieIfPathStartsWithProject(
  request: NextRequest,
  response: NextResponse,
) {
  const { pathname } = request.nextUrl
  const projectPathRegex = /\/org\/.+\/project\/.+/
  const pathnameIncludesProject = projectPathRegex.test(pathname)

  if (pathnameIncludesProject) {
    const [, , , , projectSlug] = pathname.split('/')

    response.cookies.set('project', projectSlug)
  } else {
    response.cookies.delete('project')
  }
}

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const { pathname } = request.nextUrl
  const token = request.cookies.get('token')?.value

  setOrgCookieIfPathStartsWithOrg(request, response)
  setProjectCookieIfPathStartsWithProject(request, response)

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
