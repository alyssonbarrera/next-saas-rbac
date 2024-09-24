import { Fragment } from 'react'

export default function AppLayout({
  children,
  sheet,
}: Readonly<{
  children: React.ReactNode
  sheet: React.ReactNode
}>) {
  return (
    <Fragment>
      {children}
      {sheet}
    </Fragment>
  )
}
