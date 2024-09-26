'use client'

import { XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { deleteProjectAction } from '@/app/(app)/org/[slug]/project/[project]/actions'
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
import { queryClient } from '@/lib/react-query'

type DeleteProjectButtonProps = {
  projectId: string
  organizationSlug: string
}

export function DeleteProjectButton({
  projectId,
  organizationSlug,
}: DeleteProjectButtonProps) {
  const router = useRouter()

  async function handleDeleteProject() {
    await deleteProjectAction(projectId)

    router.push(`/org/${organizationSlug}`)
    queryClient.invalidateQueries({
      queryKey: [organizationSlug, 'projects'],
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" variant="destructive" className="w-56">
          <XCircle className="mr-2 size-4" />
          Delete project
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete project</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            project.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
          <AlertDialogAction type="button" onClick={handleDeleteProject}>
            Delete project
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
