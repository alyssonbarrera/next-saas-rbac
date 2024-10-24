import { ShieldCheck, UserCircle } from 'lucide-react'

import { ability, getCurrentOrg } from '@/auth'
import { getInvitesRequest } from '@/http/requests/invites/get-invites-request'

import { CreateInviteForm } from '../forms/create-invite-form'
import { RevokeInviteButton } from '../revoke-invite-button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableRow } from '../ui/table'

export async function Invites() {
  const permissions = await ability()
  const currentOrganization = await getCurrentOrg()

  const { invites } = await getInvitesRequest(currentOrganization!)

  return (
    <div className="space-y-4">
      {permissions?.can('create', 'Invite') && (
        <Card>
          <CardHeader>
            <CardTitle>Invite member</CardTitle>
          </CardHeader>

          <CardContent>
            <CreateInviteForm />
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Invites</h2>

        <div className="rounded border">
          <Table>
            <TableBody>
              {invites.map((invite) => (
                <TableRow key={invite.id}>
                  <TableCell className="py-2.5">
                    <span className="inline-flex items-center gap-2 text-muted-foreground">
                      <UserCircle className="size-4" />
                      {invite.email}
                    </span>
                  </TableCell>

                  <TableCell className="py-2.5 font-medium">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="size-4" />
                      {invite.role}
                    </div>
                  </TableCell>

                  {invite.author && (
                    <TableCell className="py-2.5 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        {invite.author.avatarUrl ? (
                          <Avatar className="size-4">
                            <AvatarFallback />

                            <AvatarImage src={invite.author.avatarUrl} />
                          </Avatar>
                        ) : (
                          <UserCircle className="size-4" />
                        )}
                        {invite.author.name} (author)
                      </div>
                    </TableCell>
                  )}

                  <TableCell className="py-2.5">
                    <div className="flex justify-end">
                      {permissions?.can('delete', 'Invite') && (
                        <RevokeInviteButton inviteId={invite.id} />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {invites.length === 0 && (
                <TableRow>
                  <TableCell className="text-center text-muted-foreground">
                    No invites found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
