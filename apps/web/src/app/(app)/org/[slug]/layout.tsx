import { Header } from '@/components/header'
import { Tabs } from '@/components/tabs'

export default function OrganizationLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <div className="pt-6">
        <Header />
        <Tabs />
      </div>

      <main className="mx-auto w-full max-w-[1200px] px-4 py-4 xl:px-0">
        {children}
      </main>
    </div>
  )
}
