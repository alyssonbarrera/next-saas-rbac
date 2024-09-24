import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Next SaaS RBAC',
}

const inter = Inter({
  variable: '--font-inter',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
