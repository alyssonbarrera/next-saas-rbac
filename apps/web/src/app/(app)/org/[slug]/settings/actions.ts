'use server'

import { revalidateTag } from 'next/cache'

import { getCurrentOrg } from '@/auth'
import { updateOrganizationRequest } from '@/http/requests/organizations/update-organization-request'
import { executeServerActionWithHandling } from '@/utils/execute-server-action-with-handling'
import { organizationSchema } from '@/validations/schemas/organization-schema'

export async function updateOrganizationAction(data: FormData) {
  const result = organizationSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { name, domain, shouldAttachUsersByDomain } = result.data

  async function executeUpdateOrganization() {
    const currentOrganization = await getCurrentOrg()

    await updateOrganizationRequest({
      name,
      domain,
      shouldAttachUsersByDomain,
      organizationSlug: currentOrganization!,
    })

    revalidateTag('organizations')
  }

  return await executeServerActionWithHandling({
    action: executeUpdateOrganization,
    successMessage: 'Successfully saved the organization.',
  })
}
