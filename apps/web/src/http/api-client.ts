import { env } from '@saas/env'
import ky from 'ky'

async function setTokenFromCookies(request: Request) {
  let token: string | undefined

  if (typeof window === 'undefined') {
    const { cookies: serverCookies } = await import('next/headers')

    const cookieStore = await serverCookies()
    token = cookieStore.get('token')?.value
  }

  if (typeof window !== 'undefined') {
    const { default: clientCookies } = await import('js-cookie')

    token = clientCookies.get('token')
  }

  if (token) {
    request.headers.set('Authorization', `Bearer ${token}`)
  }
}

export const api = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [setTokenFromCookies],
  },
})
