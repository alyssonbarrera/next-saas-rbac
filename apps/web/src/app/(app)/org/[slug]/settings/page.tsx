import { ability, getCurrentOrg } from '@/auth'
import { Billing } from '@/components/billing'
import { DangerZoneCard } from '@/components/danger-zone-card'
import { OrganizationForm } from '@/components/forms/organization-form'
import { ShutdownOrganizationButton } from '@/components/shutdown-organization-button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { getOrganizationRequest } from '@/http/requests/organizations/get-organization-request'

export default async function Settings() {
  const currentOrganization = await getCurrentOrg()
  const permissions = await ability()

  const canUpdateOrganization = permissions?.can('update', 'Organization')
  const canGetBilling = permissions?.can('get', 'Billing')
  const canShutdownOrganization = permissions?.can('delete', 'Organization')

  const { organization } = await getOrganizationRequest(currentOrganization!)

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="space-y-4">
        {canUpdateOrganization && (
          <Card>
            <CardHeader>
              <CardTitle>Organization settings</CardTitle>
              <CardDescription>
                Update your organization details
              </CardDescription>
            </CardHeader>

            <CardContent>
              <OrganizationForm
                isUpdating
                initialData={{
                  name: organization.name,
                  domain: organization.domain,
                  shouldAttachUsersByDomain:
                    organization.shouldAttachUsersByDomain,
                }}
              />
            </CardContent>
          </Card>
        )}

        {canGetBilling && (
          <Card>
            <CardHeader>
              <CardTitle>Billing</CardTitle>
              <CardDescription>Manage your billing details</CardDescription>
            </CardHeader>

            <CardContent>
              <Billing />
            </CardContent>
          </Card>
        )}

        {canShutdownOrganization && (
          <DangerZoneCard
            title="Shutdown organization"
            description="This will delete all organization data including all projects. You cannot undo this action."
          >
            <ShutdownOrganizationButton />
          </DangerZoneCard>
        )}
      </div>
    </div>
  )
}
