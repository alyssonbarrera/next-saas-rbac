'use server'

import { revalidateTag } from 'next/cache'

import { createOrganizationRequest } from '@/http/requests/organizations/create-organization-request'
import { executeServerActionWithHandling } from '@/utils/execute-server-action-with-handling'
import { organizationSchema } from '@/validations/schemas/organization-schema'

export async function createOrganizationAction(data: FormData) {
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

  async function executeCreateOrganization() {
    await createOrganizationRequest({
      name,
      domain,
      shouldAttachUsersByDomain,
    })

    revalidateTag('organizations')
  }

  return await executeServerActionWithHandling({
    action: executeCreateOrganization,
    successMessage: 'Successfully saved the organization.',
  })
}
