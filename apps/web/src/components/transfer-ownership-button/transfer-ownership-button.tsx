import { ArrowLeftRight } from 'lucide-react'
import { ComponentProps } from 'react'

import { transferOwnershipAction } from '@/app/(app)/org/[slug]/members/actions'
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
import { Member } from '@/http/requests/members/get-members-request'

type TransferOwnershipButtonProps = ComponentProps<typeof Button> & {
  member: Member
}

export function TransferOwnershipButton({
  member,
  ...props
}: TransferOwnershipButtonProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button {...props} size="sm" variant="ghost">
          <ArrowLeftRight className="mr-2 size-4" />
          Transfer ownership
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Transfer ownership</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently transfer the
            ownership of the organization to{' '}
            <span className="font-medium text-foreground">
              {member.name || member.email}
            </span>
            .
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
          <form action={transferOwnershipAction.bind(null, member.userId)}>
            <AlertDialogAction type="submit" variant="default">
              Transfer ownership
            </AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
