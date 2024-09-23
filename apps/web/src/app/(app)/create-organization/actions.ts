'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'

import { createOrganizationRequest } from '@/http/requests/organizations/create-organization-request'
import { createOrganizationSchema } from '@/validations/schemas/create-organization-schema'

export async function createOrganizationAction(data: FormData) {
  const result = createOrganizationSchema.safeParse(Object.fromEntries(data))

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
    await createOrganizationRequest({
      name,
      domain,
      shouldAttachUsersByDomain,
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
