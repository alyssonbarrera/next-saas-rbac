import { Header } from '@/components/header'

export default async function Home() {
  return (
    <div className="space-y-4 py-4">
      <Header />
      <main className="mx-auto w-full max-w-[1200px]">
        <h1 className="text-2xl font-bold">Selecione uma organização</h1>
      </main>
    </div>
  )
}
