import { Header } from '@/components/header'

export default async function Home() {
  return (
    <div className="space-y-4 pt-6">
      <Header />
      <main className="mx-auto w-full max-w-[1200px] px-4 xl:px-0">
        <h1 className="text-2xl font-bold">Selecione uma organização</h1>
      </main>
    </div>
  )
}
