import { organizationSchema } from '@saas/auth'
import { Crown } from 'lucide-react'
import Image from 'next/image'

import { ability, getCurrentOrg } from '@/auth'
import { getMembersRequest } from '@/http/requests/members/get-members-request'
import { getMembershipRequest } from '@/http/requests/organizations/get-membership-request'
import { getOrganizationRequest } from '@/http/requests/organizations/get-organization-request'

import { RemoveMemberButton } from '../remove-member-button'
import { TransferOwnershipButton } from '../transfer-ownership-button'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Table, TableBody, TableCell, TableRow } from '../ui/table'
import { UpdateMemberRoleSelect } from '../update-member-role-select'

export async function MemberList() {
  const permissions = await ability()
  const currentOrganization = getCurrentOrg()

  const [{ membership }, { members }, { organization }] = await Promise.all([
    getMembershipRequest(currentOrganization!),
    getMembersRequest(currentOrganization!),
    getOrganizationRequest(currentOrganization!),
  ])

  const authOrganization = organizationSchema.parse(organization)

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Members</h2>

      <div className="rounded border">
        <Table>
          <TableBody>
            {members.map((member) => (
              <TableRow key={member.id}>
                <TableCell
                  className="py-2.5"
                  style={{
                    width: 48,
                  }}
                >
                  <Avatar>
                    <AvatarFallback />
                    {member.avatarUrl && (
                      <Image
                        src={member.avatarUrl}
                        alt="Avatar"
                        width={32}
                        height={32}
                        className="aspect-square size-full"
                      />
                    )}
                  </Avatar>
                </TableCell>

                <TableCell className="w-full py-2.5">
                  <div className="flex flex-col">
                    <span className="inline-flex items-center gap-2 font-medium">
                      {member.name}{' '}
                      {member.userId === membership.userId && '(me)'}
                      {organization.ownerId === member.userId && (
                        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <Crown className="size-3" />
                          Owner
                        </span>
                      )}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {member.email}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="py-2.5">
                  <div className="flex items-center justify-end gap-2">
                    {permissions?.can(
                      'transfer_ownership',
                      authOrganization,
                    ) && (
                      <TransferOwnershipButton
                        member={member}
                        disabled={organization.ownerId === member.userId}
                      />
                    )}

                    <UpdateMemberRoleSelect
                      memberId={member.id}
                      value={member.role}
                      disabled={
                        member.userId === membership.userId ||
                        organization.ownerId === member.userId ||
                        permissions?.cannot('update', 'User')
                      }
                    />

                    {permissions?.can('delete', 'User') && (
                      <RemoveMemberButton
                        member={member}
                        membership={membership}
                        organization={organization}
                      />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
