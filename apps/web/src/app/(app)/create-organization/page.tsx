import { OrganizationForm } from '@/components/forms/organization-form'
import { Header } from '@/components/header'

export default function CreateOrganization() {
  return (
    <div className="space-y-4 pt-6">
      <Header />
      <main className="mx-auto w-full max-w-[1200px] space-y-4">
        <h1 className="text-2xl font-bold">Create organization</h1>

        <OrganizationForm />
      </main>
    </div>
  )
}
