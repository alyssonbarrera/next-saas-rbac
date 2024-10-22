import { XCircle } from 'lucide-react'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

import { getCurrentOrg } from '@/auth'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { shutdownOrganizationRequest } from '@/http/requests/organizations/shutdown-organization-request'

export function ShutdownOrganizationButton() {
  async function shutdownOrganizationAction() {
    'use server'

    const currentOrganization = await getCurrentOrg()

    await shutdownOrganizationRequest(currentOrganization!)
    revalidateTag('organizations')

    redirect('/')
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" variant="destructive" className="w-56">
          <XCircle className="mr-2 size-4" />
          Shutdown organization
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Shutdown organization</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            organization data including all projects.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
          <form action={shutdownOrganizationAction}>
            <AlertDialogAction type="submit">
              Shutdown organization
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
