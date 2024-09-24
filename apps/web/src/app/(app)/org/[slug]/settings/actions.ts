'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'

import { getCurrentOrg } from '@/auth'
import { updateOrganizationRequest } from '@/http/requests/organizations/update-organization-request'
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

  try {
    await updateOrganizationRequest({
      name,
      domain,
      shouldAttachUsersByDomain,
      organizationSlug: getCurrentOrg()!,
    })

    revalidateTag('organizations')
  } catch (error) {
    if (error instanceof HTTPError) {
      const { message } = await error.response.json()

      return {
        success: false,
        message,
        errors: null,
      }
    }

    console.error(error)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Successfully saved the organization.',
    errors: null,
  }
}
