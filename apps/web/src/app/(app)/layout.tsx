import { Fragment } from 'react'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <Fragment>{children}</Fragment>
}
