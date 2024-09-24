import { UserMinus } from 'lucide-react'

import { removeMemberAction } from '@/app/(app)/org/[slug]/members/actions'
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
import { Membership } from '@/http/requests/organizations/get-membership-request'
import { Organization } from '@/http/requests/organizations/get-organization-request'

type RemoveMemberButtonProps = {
  member: Member
  membership: Membership
  organization: Organization
}

export function RemoveMemberButton({
  member,
  membership,
  organization,
}: RemoveMemberButtonProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          size="sm"
          variant="destructive"
          disabled={
            member.userId === membership.userId ||
            organization.ownerId === member.userId
          }
        >
          <UserMinus className="mr-2 size-4" />
          Remove
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove member</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            member from the organization.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
          <form action={removeMemberAction.bind(null, member.id)}>
            <AlertDialogAction type="submit">Remove member</AlertDialogAction>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
